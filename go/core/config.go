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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/xml/{ipAddress}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "xml",
									},
									map[string]any{
										"var": "ip_address",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip_address",
											"orig": "ip_address",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "1.1.1.1",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip_address",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/xml",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "xml",
									},
								},
								"parts": []any{
									"api",
									"xml",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"json": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asn",
						"title": "Asn",
						"type": "`$STRING`",
						"short": "Autonomous System Number",
					},
					map[string]any{
						"name": "asnOrganization",
						"title": "Asn Organization",
						"type": "`$STRING`",
						"short": "Organization associated with the ASN",
					},
					map[string]any{
						"name": "capital",
						"title": "Capital",
						"type": "`$STRING`",
						"short": "Capital city of the country",
					},
					map[string]any{
						"name": "cityName",
						"title": "City Name",
						"type": "`$STRING`",
						"short": "City name",
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "continent",
						"title": "Continent",
						"type": "`$STRING`",
						"short": "Continent name",
					},
					map[string]any{
						"name": "continentCode",
						"title": "Continent Code",
						"type": "`$STRING`",
						"short": "Two-letter continent code",
					},
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO 3166-1 alpha-2 country code",
					},
					map[string]any{
						"name": "countryName",
						"title": "Country Name",
						"type": "`$STRING`",
						"short": "Full country name",
					},
					map[string]any{
						"name": "currencies",
						"title": "Currencies",
						"type": "`$ARRAY`",
						"short": "List of currencies used in the country",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$OBJECT`",
						"short": "Currency information for the country",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"short": "IPv4 or IPv6 address to lookup",
					},
					map[string]any{
						"name": "ipAddress",
						"title": "Ip Address",
						"type": "`$STRING`",
						"short": "The IP address that was looked up",
					},
					map[string]any{
						"name": "ipVersion",
						"title": "Ip Version",
						"type": "`$INTEGER`",
						"short": "IP version (4 for IPv4, 6 for IPv6)",
					},
					map[string]any{
						"name": "isProxy",
						"title": "Is Proxy",
						"type": "`$BOOLEAN`",
						"short": "Whether the IP is detected as a proxy, VPN, or hosting service",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
						"short": "Primary language code",
					},
					map[string]any{
						"name": "languages",
						"title": "Languages",
						"type": "`$ARRAY`",
						"short": "List of languages spoken in the country",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"short": "Latitude coordinate",
						"format": "double",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Longitude coordinate",
						"format": "double",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phoneCodes",
						"title": "Phone Codes",
						"type": "`$ARRAY`",
						"short": "International dialing codes for the country",
					},
					map[string]any{
						"name": "regionCode",
						"title": "Region Code",
						"type": "`$STRING`",
						"short": "Region or state code",
					},
					map[string]any{
						"name": "regionName",
						"title": "Region Name",
						"type": "`$STRING`",
						"short": "Region or state name",
					},
					map[string]any{
						"name": "timeZone",
						"title": "Time Zone",
						"type": "`$STRING`",
						"short": "Timezone offset from UTC",
					},
					map[string]any{
						"name": "timeZones",
						"title": "Time Zones",
						"type": "`$ARRAY`",
						"short": "List of timezone identifiers for the location",
					},
					map[string]any{
						"name": "tlds",
						"title": "Tlds",
						"type": "`$ARRAY`",
						"short": "Top-level domains for the country",
					},
					map[string]any{
						"name": "zipCode",
						"title": "Zip Code",
						"type": "`$STRING`",
						"short": "Postal/ZIP code",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "json",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "json",
									},
								},
								"parts": []any{
									"api",
									"json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "json",
									},
								},
								"parts": []any{
									"api",
									"json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/json/{ipAddress}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "json",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ip_address",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "193.247.239.168",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
