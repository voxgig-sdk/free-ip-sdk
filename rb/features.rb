# FreeIp SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FreeIpFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeIpBaseFeature.new
    when "ratelimit"
      FreeIpRatelimitFeature.new
    when "retry"
      FreeIpRetryFeature.new
    when "test"
      FreeIpTestFeature.new
    when "timeout"
      FreeIpTimeoutFeature.new
    else
      FreeIpBaseFeature.new
    end
  end
end
