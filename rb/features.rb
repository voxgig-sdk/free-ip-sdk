# FreeIp SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FreeIpFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeIpBaseFeature.new
    when "test"
      FreeIpTestFeature.new
    else
      FreeIpBaseFeature.new
    end
  end
end
