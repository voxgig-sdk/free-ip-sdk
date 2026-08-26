package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FreeIp",
			"slug": "free-ip",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://free.freeipapi.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"ip_geolocation": map[string]any{},
				"json": map[string]any{},
			},
		},
		"entity": map[string]any{
			"ip_geolocation": map[string]any{
				"fields": []any{},
				"name": "ip_geolocation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "1.1.1.1",
											"kind": "param",
											"name": "ip_address",
											"orig": "ip_address",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/xml/{ipAddress}",
								"parts": []any{
									"api",
									"xml",
									"{ip_address}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ipAddress": "ip_address",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip_address",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/xml",
								"parts": []any{
									"api",
									"xml",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"xml",
						},
					},
				},
			},
			"json": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asn",
						"short": "Autonomous System Number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "asnOrganization",
						"short": "Organization associated with the ASN",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "capital",
						"short": "Capital city of the country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cityName",
						"short": "City name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "continent",
						"short": "Continent name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "continentCode",
						"short": "Two-letter continent code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryCode",
						"short": "ISO 3166-1 alpha-2 country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryName",
						"short": "Full country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currencies",
						"short": "List of currencies used in the country",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "currency",
						"short": "Currency information for the country",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"short": "IPv4 or IPv6 address to lookup",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ipAddress",
						"short": "The IP address that was looked up",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ipVersion",
						"short": "IP version (4 for IPv4, 6 for IPv6)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "isProxy",
						"short": "Whether the IP is detected as a proxy, VPN, or hosting service",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "language",
						"short": "Primary language code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "languages",
						"short": "List of languages spoken in the country",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phoneCodes",
						"short": "International dialing codes for the country",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "regionCode",
						"short": "Region or state code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regionName",
						"short": "Region or state name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timeZone",
						"short": "Timezone offset from UTC",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timeZones",
						"short": "List of timezone identifiers for the location",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tlds",
						"short": "Top-level domains for the country",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "zipCode",
						"short": "Postal/ZIP code",
						"type": "`$STRING`",
					},
				},
				"name": "json",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/json",
								"parts": []any{
									"api",
									"json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/json",
								"parts": []any{
									"api",
									"json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "193.247.239.168",
											"kind": "param",
											"name": "id",
											"orig": "ip_address",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/json/{ipAddress}",
								"parts": []any{
									"api",
									"json",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ipAddress": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
