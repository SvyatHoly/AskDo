require 'json'
require 'ostruct'

module ChangelogGenerator
  class CommitsFetcher
    def initialize(api)
      @api = api
    end

    def get_commits(base, head)
      commits = @api.compare(base, head)&.commits

      return commits.each do |item|
        # Check for PR number only for merge commits
        pr_number = pr_number(item.commit.message) if item.parents.count > 1
        # And there's no PR if there's no PR number
        pr = @api.pr(pr_number) unless pr_number.nil?
        item.pull_request = pr
      end
    end

    private
    def pr_number(message)
      message[/(?<=\(#)\d+(?=\))/]
    end
  end
end
