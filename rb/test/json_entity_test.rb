# Json entity test

require "minitest/autorun"
require "json"
require_relative "../FreeIp_sdk"
require_relative "runner"

class JsonEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FreeIpSDK.test(nil, nil)
    ent = testsdk.Json(nil)
    assert !ent.nil?
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
    cfg = FreeIpConfig.make_config
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
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FREEIP_TEST_JSON_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    json_ref01_ent = client.Json(nil)
    json_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.json"), "json_ref01"))

    json_ref01_data_result = json_ref01_ent.create(json_ref01_data, nil)
    json_ref01_data = Helpers.to_map(json_ref01_data_result)
    assert !json_ref01_data.nil?

    # LIST
    json_ref01_match = {}

    json_ref01_list_result = json_ref01_ent.list(json_ref01_match, nil)
    assert json_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(json_ref01_list_result),
      { "id" => json_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    json_ref01_match_dt0 = {}
    json_ref01_data_dt0_loaded = json_ref01_ent.load(json_ref01_match_dt0, nil)
    assert !json_ref01_data_dt0_loaded.nil?

  end
end

def json_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "json", "JsonTestData.json")
  entity_data_source = File.read(entity_data_file)
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

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["FREEIP_TEST_JSON_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FREEIP_TEST_JSON_ENTID" => idmap,
    "FREEIP_TEST_LIVE" => "FALSE",
    "FREEIP_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["FREEIP_TEST_JSON_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FREEIP_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = FreeIpSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FREEIP_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FREEIP_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
