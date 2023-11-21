require 'active_support/core_ext/hash/deep_merge.rb'

module ChangelogGenerator
  class ChangelogGenerator
    PLATFORMS = ['iOS', 'Android']
    DEFAULT_CATEGORY = 'uncategorized'

    private_constant :PLATFORMS, :DEFAULT_CATEGORY

    Dimension = Struct.new(:platform, :tag)

    def initialize(supported_tags, skip_tag)
      @supported_tags = supported_tags
      @skip_tag = skip_tag
    end

    def get_changelog(commits)
      tempate = @supported_tags.reduce({}) do |by_tag, tag|
        {
          **by_tag,
          tag => PLATFORMS.reduce({}) do |by_platform, platform|
            { **by_platform, platform => [] }
          end
        }
      end
      .freeze

      acc = tempate.deep_merge({ DEFAULT_CATEGORY => {}})

      commits.each { |item|
        dimensions = get_change_dimensions(item.commit.message.split('\n').first)
        message = get_change_message(item)

        if dimensions.tag != @skip_tag
          acc[dimensions.tag][dimensions.platform] = [ *acc[dimensions.tag][dimensions.platform], message ]
        end
      }

      return acc
    end

    private
    def get_change_dimensions(changelog_message)
      tags = changelog_message.scan(/\[\w+\]/i).map { |t| t.slice(1..-2) }

      platform = PLATFORMS.filter { |p| tags.any? { |tag| tag.casecmp?(p) } }.first || DEFAULT_CATEGORY
      tag = [*@supported_tags, @skip_tag].filter { |known| tags.any? { |tag| tag.casecmp?(known) } }.first || DEFAULT_CATEGORY

      Dimension.new(platform, tag)
    end

    def get_change_message(item)
      entry = item.commit.message.split('\n').first
      # Remove the [General] [whatever] (only those we know)
      entry = entry.gsub(/(?:\[(?:#{[*@supported_tags, *PLATFORMS].join("|")})\])+/i, '')
      # Remove the PR number if it's on the end
      entry = entry.gsub(/ \(#\d*\)$/, '')
      # Remove multiple spaces
      entry = entry.squeeze(' ')
      # Remove leading dash if exists
      entry = entry.gsub(/^\s?-/, '').strip

      # Capitalize if needed
      entry.capitalize if entry[/^[A-Z]/].nil?

      commit_link = "[#{item.sha.slice(0, 10)}](#{item.html_url})"
      author_link = item.author ? " by [@#{item.author.login}](#{item.author.html_url})" : ''
      author_section = '(' + commit_link + author_link + ')'
      
      "- #{entry} #{author_section}"
    end
  end
end
