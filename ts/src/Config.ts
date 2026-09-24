
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'FreeIp',
        slug: "free-ip",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://free.freeipapi.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        ip_geolocation: {
        },
  
        json: {
        },
  
    }
  }


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
              "kind": "http",
              "method": "GET",
              "orig": "/api/xml/{ipAddress}",
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
              "parts": [
                "api",
                "xml",
                "{ip_address}"
              ],
              "rename": {
                "param": {
                  "ipAddress": "ip_address"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "ip_address",
                    "orig": "ip_address",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "1.1.1.1"
                  }
                ]
              },
              "select": {
                "exist": [
                  "ip_address"
                ]
              }
            },
            {
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
              "parts": [
                "api",
                "xml"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "json": {
      "fields": [
        {
          "name": "asn",
          "title": "Asn",
          "type": "`$STRING`",
          "short": "Autonomous System Number"
        },
        {
          "name": "asnOrganization",
          "title": "Asn Organization",
          "type": "`$STRING`",
          "short": "Organization associated with the ASN"
        },
        {
          "name": "capital",
          "title": "Capital",
          "type": "`$STRING`",
          "short": "Capital city of the country"
        },
        {
          "name": "cityName",
          "title": "City Name",
          "type": "`$STRING`",
          "short": "City name"
        },
        {
          "name": "code",
          "title": "Code",
          "type": "`$STRING`"
        },
        {
          "name": "continent",
          "title": "Continent",
          "type": "`$STRING`",
          "short": "Continent name"
        },
        {
          "name": "continentCode",
          "title": "Continent Code",
          "type": "`$STRING`",
          "short": "Two-letter continent code"
        },
        {
          "name": "countryCode",
          "title": "Country Code",
          "type": "`$STRING`",
          "short": "ISO 3166-1 alpha-2 country code"
        },
        {
          "name": "countryName",
          "title": "Country Name",
          "type": "`$STRING`",
          "short": "Full country name"
        },
        {
          "name": "currencies",
          "title": "Currencies",
          "type": "`$ARRAY`",
          "short": "List of currencies used in the country"
        },
        {
          "name": "currency",
          "title": "Currency",
          "type": "`$OBJECT`",
          "short": "Currency information for the country"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "title": "Ip",
          "type": "`$STRING`",
          "short": "IPv4 or IPv6 address to lookup"
        },
        {
          "name": "ipAddress",
          "title": "Ip Address",
          "type": "`$STRING`",
          "short": "The IP address that was looked up"
        },
        {
          "name": "ipVersion",
          "title": "Ip Version",
          "type": "`$INTEGER`",
          "short": "IP version (4 for IPv4, 6 for IPv6)"
        },
        {
          "name": "isProxy",
          "title": "Is Proxy",
          "type": "`$BOOLEAN`",
          "short": "Whether the IP is detected as a proxy, VPN, or hosting service"
        },
        {
          "name": "language",
          "title": "Language",
          "type": "`$STRING`",
          "short": "Primary language code"
        },
        {
          "name": "languages",
          "title": "Languages",
          "type": "`$ARRAY`",
          "short": "List of languages spoken in the country"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "Latitude coordinate",
          "format": "double"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude coordinate",
          "format": "double"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "phoneCodes",
          "title": "Phone Codes",
          "type": "`$ARRAY`",
          "short": "International dialing codes for the country"
        },
        {
          "name": "regionCode",
          "title": "Region Code",
          "type": "`$STRING`",
          "short": "Region or state code"
        },
        {
          "name": "regionName",
          "title": "Region Name",
          "type": "`$STRING`",
          "short": "Region or state name"
        },
        {
          "name": "timeZone",
          "title": "Time Zone",
          "type": "`$STRING`",
          "short": "Timezone offset from UTC"
        },
        {
          "name": "timeZones",
          "title": "Time Zones",
          "type": "`$ARRAY`",
          "short": "List of timezone identifiers for the location"
        },
        {
          "name": "tlds",
          "title": "Tlds",
          "type": "`$ARRAY`",
          "short": "Top-level domains for the country"
        },
        {
          "name": "zipCode",
          "title": "Zip Code",
          "type": "`$STRING`",
          "short": "Postal/ZIP code"
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
              "parts": [
                "api",
                "json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
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
              "parts": [
                "api",
                "json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/json/{ipAddress}",
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
              "parts": [
                "api",
                "json",
                "{id}"
              ],
              "rename": {
                "param": {
                  "ipAddress": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "ip_address",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "193.247.239.168"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

