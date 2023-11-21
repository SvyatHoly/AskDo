require 'singleton'
require 'json'
require 'ostruct'

module ChangelogGenerator
  class Config
    include Singleton
    
    def initialize
      raw_config = File.open(".github/changelog_generator.json", &:read)
      @config = JSON(raw_config, object_class: OpenStruct)
    end

    def method_missing(method, *args)
      if @config.respond_to?(method)
        @config.send(method, *args)
      else
        super
      end
    end
  end
end
