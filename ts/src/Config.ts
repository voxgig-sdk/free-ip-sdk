
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'FreeIp',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
              "select": {
                "exist": [
                  "ip_address"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/xml",
              "parts": [
                "api",
                "xml"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "asnOrganization",
          "type": "`$STRING`"
        },
        {
          "name": "capital",
          "type": "`$STRING`"
        },
        {
          "name": "cityName",
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "type": "`$STRING`"
        },
        {
          "name": "continent",
          "type": "`$STRING`"
        },
        {
          "name": "continentCode",
          "type": "`$STRING`"
        },
        {
          "name": "countryCode",
          "type": "`$STRING`"
        },
        {
          "name": "countryName",
          "type": "`$STRING`"
        },
        {
          "name": "currencies",
          "type": "`$ARRAY`"
        },
        {
          "name": "currency",
          "type": "`$OBJECT`"
        },
        {
          "name": "ip",
          "type": "`$STRING`"
        },
        {
          "name": "ipAddress",
          "type": "`$STRING`"
        },
        {
          "name": "ipVersion",
          "type": "`$INTEGER`"
        },
        {
          "name": "isProxy",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "language",
          "type": "`$STRING`"
        },
        {
          "name": "languages",
          "type": "`$ARRAY`"
        },
        {
          "name": "latitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "longitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "phoneCodes",
          "type": "`$ARRAY`"
        },
        {
          "name": "regionCode",
          "type": "`$STRING`"
        },
        {
          "name": "regionName",
          "type": "`$STRING`"
        },
        {
          "name": "timeZone",
          "type": "`$STRING`"
        },
        {
          "name": "timeZones",
          "type": "`$ARRAY`"
        },
        {
          "name": "tlds",
          "type": "`$ARRAY`"
        },
        {
          "name": "zipCode",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "api",
                "json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
  config
}

