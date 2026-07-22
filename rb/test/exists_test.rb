# FreeIp SDK exists test

require "minitest/autorun"
require_relative "../FreeIp_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FreeIpSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
