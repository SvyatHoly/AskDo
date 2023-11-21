module Helpers  
  def self.should_produce_verbose_logs?
    ENV["VERBOSE_LOGS"] == "true"
  end
  
  def self.gather_gradle_flags(options)
    flags = []
    flags << "-i" if should_produce_verbose_logs?
    flags << options[:flags] if options[:flags] != nil
    flags.join(" ")
  end
  
  def self.remove_obsolete_mappings
    file_paths = Dir.glob("../android/app/build/**/mapping.txt")
    file_paths.each do |path|
      FileUtils.rm_f(path)
    end
  end
  
  def self.set_firebase_analytic_enabled(enabled)
    config_path = "../firebase.json"
  
    config_file = File.read(config_path)
    config = JSON.parse(config_file)
    if enabled
      UI.message("Enabling Firebase Analytics & Crashlytics")
    else
      UI.message("Disabling Firebase Analytics & Crashlytics")
    end
    config["react-native"]["analytics_collection_deactivated"] = !enabled
    config["react-native"]["crashlytics_debug_enabled"] = enabled
  
    File.write(config_path, JSON.pretty_generate(config))
  end

  def self.get_provisioning_profiles(id_to_name, base_path, prefix)
    return id_to_name.map { |k, v| [k, File.join(base_path, "#{prefix}_#{k}.mobileprovision")] }.to_h
  end

  def self.capitalize_first(word)
    letters = word.split('')
    letters.first.upcase!
    letters.join
    return letters.join
  end
end
