module Fastlane
  module Actions
    class ChangelogGeneratorAction < Action
      GitTag = Struct.new(:name, :url)

      def self.run(params)
        require_relative 'changelog_generator/config'
        require_relative 'changelog_generator/github_api'
        require_relative 'changelog_generator/commits_fetcher'
        require_relative 'changelog_generator/changelog_generator'
        require_relative 'changelog_generator/markdown_generator'

        config = ChangelogGenerator::Config.instance
        github_api = ChangelogGenerator::Github.new(params[:api_token])
        commits_fetcher = ChangelogGenerator::CommitsFetcher.new(github_api)

        last_release_tag = `git describe --abbrev=0 --tags`.strip
        base = `git rev-list -n 1 #{last_release_tag}`.strip
        head = `git merge-base main HEAD`.strip

        commits = commits_fetcher.get_commits(base, head).filter do |item|
          labels = item.pull_request&.labels&.map { |l| l.name } || []
          # Only merges, with PR and without skip labels in it
          item.parents.count > 1 && !item.pull_request.nil? && !labels.any? { |l| config.skip_labels.include?(l) }
        end

        changelog_generator = ChangelogGenerator::ChangelogGenerator.new(config.tags, config.skip_tag)
        markdown_generator = ChangelogGenerator::MarkdownGenerator.new

        changelog = changelog_generator.get_changelog(commits)
        markdown = markdown_generator.get_markdown(changelog)

        puts(markdown)

        return format_to_jira(markdown)
      end

      #TODO: improve formatting
      def self.format_to_jira(changelog_markdown)
        "{panel:title=Changelog}
        {noformat}
        #{changelog_markdown}
        {noformat}
        {panel}"
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Generates a changelog for the current release and appends it to CHANGELOG.md file"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :api_token,
            env_name: "GITHUB_API_TOKEN",
            description: "Github API Token",
            is_string: true,
            optional: false
          )
        ]
      end

      def self.authors
        ["Igor Sova"]
      end

      def self.is_supported?(platform)
        [:ios, :android].include?(platform)
      end
    end
  end
end
