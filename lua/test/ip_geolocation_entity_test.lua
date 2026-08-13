-- IpGeolocation entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("free-ip_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("IpGeolocationEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:IpGeolocation(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = ip_geolocation_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "ip_geolocation." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set FREE_IP_TEST_IP_GEOLOCATION_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local ip_geolocation_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.ip_geolocation")))
    local ip_geolocation_ref01_data = nil
    if #ip_geolocation_ref01_data_raw > 0 then
      ip_geolocation_ref01_data = helpers.to_map(ip_geolocation_ref01_data_raw[1][2])
    end

    -- LOAD
    local ip_geolocation_ref01_ent = client:IpGeolocation(nil)
    local ip_geolocation_ref01_match_dt0 = {}
    local ip_geolocation_ref01_data_dt0_loaded, err = ip_geolocation_ref01_ent:load(ip_geolocation_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(ip_geolocation_ref01_data_dt0_loaded)

  end)
end)

function ip_geolocation_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/ip_geolocation/IpGeolocationTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read ip_geolocation test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "ip_geolocation01", "ip_geolocation02", "ip_geolocation03", "xml01", "xml02", "xml03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("FREE_IP_TEST_IP_GEOLOCATION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["FREE_IP_TEST_IP_GEOLOCATION_ENTID"] = idmap,
    ["FREE_IP_TEST_LIVE"] = "FALSE",
    ["FREE_IP_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["FREE_IP_TEST_IP_GEOLOCATION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["FREE_IP_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["FREE_IP_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["FREE_IP_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
