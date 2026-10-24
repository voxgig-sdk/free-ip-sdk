# Json entity test

require "minitest/autorun"
require "json"
require_relative "../FreeIp_sdk"
require_relative "runner"

class JsonEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = FreeIpSDK.test(nil, nil)
    ent = testsdk.Json(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "json" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = FreeIpSDK.test(seed, nil).Json(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "json" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = FreeIpSDK.test(seed, nil)
    seen = base.Json(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = FreeIpConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = FreeIpSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Json(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < FreeIpBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "json hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      FreeIpSDK.test(offline, nil).Json(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    FreeIpSDK.test(offline, nil).Json(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = FreeIpConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = FreeIpSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.Json(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    FreeIpSDK.test(nil, nil).Json(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = FreeIpSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.Json(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.Json(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate_list_response
    cfg = FreeIpConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    opts = { "feature" => { "validate" => { "active" => true, "request" => false, "response" => true } } }
    listed = FreeIpSDK.test({ "entity" => { "json" => { "v1" => {  } } } }, opts).Json(nil).list(nil, nil)
    assert_equal ["v1"], listed.map { |ent| ent.data_get["id"] }
    err = assert_raises(StandardError) do
      FreeIpSDK.test({ "entity" => { "json" => { "v1" => { "asn" => 1 } } } }, opts).Json(nil).list(nil, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_validate
    cfg = FreeIpConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = FreeIpSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Json(nil).list({ "asn" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = json_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "json." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    json_ref01_ent = client.Json(nil)
    json_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.json"), "json_ref01"))

    json_ref01_data_result = json_ref01_ent.create(json_ref01_data, nil)
    json_ref01_data = Helpers.to_map(json_ref01_data_result.respond_to?(:data_get) ? json_ref01_data_result.data_get : json_ref01_data_result)
    assert !json_ref01_data.nil?
    assert !json_ref01_data["id"].nil?

    # LIST
    json_ref01_match = {}

    json_ref01_list_result = json_ref01_ent.list(json_ref01_match, nil)
    assert json_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(json_ref01_list_result),
      { "id" => json_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    json_ref01_match_dt0 = {
      "id" => json_ref01_data["id"],
    }
    json_ref01_data_dt0_loaded = json_ref01_ent.load(json_ref01_match_dt0, nil)
    json_ref01_data_dt0_load_result = Helpers.to_map(json_ref01_data_dt0_loaded.respond_to?(:data_get) ? json_ref01_data_dt0_loaded.data_get : json_ref01_data_dt0_loaded)
    assert !json_ref01_data_dt0_load_result.nil?
    assert_equal json_ref01_data_dt0_load_result["id"], json_ref01_data["id"]

  end
end

def json_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "json", "JsonTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FreeIpSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["json01", "json02", "json03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["FREE_IP_TEST_JSON_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FREE_IP_TEST_JSON_ENTID" => idmap,
    "FREE_IP_TEST_LIVE" => "FALSE",
    "FREE_IP_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["FREE_IP_TEST_JSON_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FREE_IP_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = FreeIpSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FREE_IP_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FREE_IP_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
