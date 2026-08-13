# FreeIp SDK configuration


def make_config():
    return {
        "main": {
            "name": "FreeIp",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://free.freeipapi.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "ip_geolocation": {},
                "json": {},
            },
        },
        "entity": {
      "ip_geolocation": {
        "fields": [],
        "name": "ip_geolocation",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "1.1.1.1",
                      "kind": "param",
                      "name": "ip_address",
                      "orig": "ip_address",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/xml/{ipAddress}",
                "parts": [
                  "api",
                  "xml",
                  "{ip_address}",
                ],
                "rename": {
                  "param": {
                    "ipAddress": "ip_address",
                  },
                },
                "select": {
                  "exist": [
                    "ip_address",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/xml",
                "parts": [
                  "api",
                  "xml",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "xml",
            ],
          ],
        },
      },
      "json": {
        "fields": [
          {
            "active": True,
            "name": "asn",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "asnOrganization",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "capital",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "cityName",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "code",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "continent",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "continentCode",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "countryCode",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "countryName",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "currencies",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "currency",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "ip",
            "req": False,
            "type": "`$STRING`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "ipAddress",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "ipVersion",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "isProxy",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "language",
            "req": False,
            "type": "`$STRING`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "languages",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 16,
          },
          {
            "active": True,
            "name": "latitude",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 17,
          },
          {
            "active": True,
            "name": "longitude",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 18,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 19,
          },
          {
            "active": True,
            "name": "phoneCodes",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 20,
          },
          {
            "active": True,
            "name": "regionCode",
            "req": False,
            "type": "`$STRING`",
            "index$": 21,
          },
          {
            "active": True,
            "name": "regionName",
            "req": False,
            "type": "`$STRING`",
            "index$": 22,
          },
          {
            "active": True,
            "name": "timeZone",
            "req": False,
            "type": "`$STRING`",
            "index$": 23,
          },
          {
            "active": True,
            "name": "timeZones",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 24,
          },
          {
            "active": True,
            "name": "tlds",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 25,
          },
          {
            "active": True,
            "name": "zipCode",
            "req": False,
            "type": "`$STRING`",
            "index$": 26,
          },
        ],
        "name": "json",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/json",
                "parts": [
                  "api",
                  "json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/json",
                "parts": [
                  "api",
                  "json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "193.247.239.168",
                      "kind": "param",
                      "name": "id",
                      "orig": "ip_address",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/json/{ipAddress}",
                "parts": [
                  "api",
                  "json",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ipAddress": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
