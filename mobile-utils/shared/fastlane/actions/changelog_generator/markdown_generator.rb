module ChangelogGenerator
  class MarkdownGenerator
    def get_markdown(changelog, version_tags = [])
      current_date = Time.now.strftime('%Y-%m-%d')
      version_link = "[#{version_tags.map(&:name).join(', ')}](#{version_tags.first&.url})"

      markdown = version_tags.empty? ? "" : "## #{version_link} (#{current_date})" + "\n"

      markdown_for_platform = Proc.new do |platform_changes|
        platform_changes.keys
          .sort().reverse() # Show `uncategorized` first since it doesn't have title
          .each do |platform|
            next if platform_changes[platform].count == 0 # Skip empty platform changes

            markdown += "\n"
            markdown += "#### #{platform} specific" + "\n\n" if platform != 'uncategorized'
            markdown += platform_changes[platform].join("\n")
            markdown += "\n"
          end
      end

      changelog.keys
        .sort()
        .each do |tag|
          next if !changelog[tag].any? { |(_, v)| v.count > 0 }

          markdown += "\n"
          markdown += "### #{tag.capitalize}" + "\n"
          
          markdown_for_platform.call(changelog[tag])
        end

      markdown
    end
  end
end
