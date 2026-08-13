package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/free-ip-sdk/go"
	"github.com/voxgig-sdk/free-ip-sdk/go/core"

	vs "github.com/voxgig-sdk/free-ip-sdk/go/utility/struct"
)

func TestIpGeolocationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.IpGeolocation(nil)
		if ent == nil {
			t.Fatal("expected non-nil IpGeolocationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := ip_geolocationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ip_geolocation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FREE_IP_TEST_IP_GEOLOCATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		ipGeolocationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.ip_geolocation", setup.data)))
		var ipGeolocationRef01Data map[string]any
		if len(ipGeolocationRef01DataRaw) > 0 {
			ipGeolocationRef01Data = core.ToMapAny(ipGeolocationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = ipGeolocationRef01Data

		// LOAD
		ipGeolocationRef01Ent := client.IpGeolocation(nil)
		ipGeolocationRef01MatchDt0 := map[string]any{}
		ipGeolocationRef01DataDt0Loaded, err := ipGeolocationRef01Ent.Load(ipGeolocationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if ipGeolocationRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func ip_geolocationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ip_geolocation", "IpGeolocationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ip_geolocation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ip_geolocation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"ip_geolocation01", "ip_geolocation02", "ip_geolocation03", "xml01", "xml02", "xml03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FREE_IP_TEST_IP_GEOLOCATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FREE_IP_TEST_IP_GEOLOCATION_ENTID": idmap,
		"FREE_IP_TEST_LIVE":      "FALSE",
		"FREE_IP_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["FREE_IP_TEST_IP_GEOLOCATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FREE_IP_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewFreeIpSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FREE_IP_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FREE_IP_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
