require 'fastlane'

module ChangelogGenerator
  class Github
    def initialize(api_token)
      @api_token = api_token
      @repo_path = `git remote get-url origin`.strip()[/[^\/:]+\/[^\/]+(?=\.git)/]
    end

    def compare(base, head)
      return nil if base.nil? || head.nil?

      response = request("/compare/#{base}...#{head}")
      JSON(response[:body], object_class: OpenStruct)
    end
    
    def pr(pr_number)
      return nil if pr_number.nil?

      response = request("/pulls/#{pr_number}")
      JSON(response[:body], object_class: OpenStruct)
    end

    def tree_html_url(object)
      "https://github.com/#{@repo_path}/tree/#{object}"
    end

    private
    def request(path, method = 'GET')
      options = FastlaneCore::Configuration.create(Fastlane::Actions::GithubApiAction.available_options, {
        api_token: @api_token,
        http_method: method,
        path: "/repos/#{@repo_path}#{path}"
      })

      Fastlane::Actions::GithubApiAction.run(options)
    end
  end
end
