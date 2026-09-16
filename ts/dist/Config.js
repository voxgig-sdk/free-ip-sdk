"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'FreeIp',
        slug: "free-ip",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://free.freeipapi.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            ip_geolocation: {},
            json: {},
        }
    };
    entity = {
        "ip_geolocation": {
            "fields": [],
            "name": "ip_geolocation",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "1.1.1.1",
                                        "kind": "param",
                                        "name": "ip_address",
                                        "orig": "ip_address",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/xml/{ipAddress}",
                            "rename": {
                                "param": {
                                    "ipAddress": "ip_address"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "xml"
                                },
                                {
                                    "var": "ip_address"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "ip_address"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "xml",
                                "{ip_address}"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/xml",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "xml"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "xml"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "xml"
                    ]
                ]
            }
        },
        "json": {
            "fields": [
                {
                    "name": "asn",
                    "short": "Autonomous System Number",
                    "type": "`$STRING`"
                },
                {
                    "name": "asnOrganization",
                    "short": "Organization associated with the ASN",
                    "type": "`$STRING`"
                },
                {
                    "name": "capital",
                    "short": "Capital city of the country",
                    "type": "`$STRING`"
                },
                {
                    "name": "cityName",
                    "short": "City name",
                    "type": "`$STRING`"
                },
                {
                    "name": "code",
                    "type": "`$STRING`"
                },
                {
                    "name": "continent",
                    "short": "Continent name",
                    "type": "`$STRING`"
                },
                {
                    "name": "continentCode",
                    "short": "Two-letter continent code",
                    "type": "`$STRING`"
                },
                {
                    "name": "countryCode",
                    "short": "ISO 3166-1 alpha-2 country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "countryName",
                    "short": "Full country name",
                    "type": "`$STRING`"
                },
                {
                    "name": "currencies",
                    "short": "List of currencies used in the country",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "currency",
                    "short": "Currency information for the country",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "ip",
                    "short": "IPv4 or IPv6 address to lookup",
                    "type": "`$STRING`"
                },
                {
                    "name": "ipAddress",
                    "short": "The IP address that was looked up",
                    "type": "`$STRING`"
                },
                {
                    "name": "ipVersion",
                    "short": "IP version (4 for IPv4, 6 for IPv6)",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "isProxy",
                    "short": "Whether the IP is detected as a proxy, VPN, or hosting service",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "language",
                    "short": "Primary language code",
                    "type": "`$STRING`"
                },
                {
                    "name": "languages",
                    "short": "List of languages spoken in the country",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "double",
                    "name": "latitude",
                    "short": "Latitude coordinate",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "longitude",
                    "short": "Longitude coordinate",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "phoneCodes",
                    "short": "International dialing codes for the country",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "regionCode",
                    "short": "Region or state code",
                    "type": "`$STRING`"
                },
                {
                    "name": "regionName",
                    "short": "Region or state name",
                    "type": "`$STRING`"
                },
                {
                    "name": "timeZone",
                    "short": "Timezone offset from UTC",
                    "type": "`$STRING`"
                },
                {
                    "name": "timeZones",
                    "short": "List of timezone identifiers for the location",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "tlds",
                    "short": "Top-level domains for the country",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "zipCode",
                    "short": "Postal/ZIP code",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "json",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/json",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "json"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/json",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "json"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "193.247.239.168",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "ip_address",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/json/{ipAddress}",
                            "rename": {
                                "param": {
                                    "ipAddress": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "json"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "json",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map