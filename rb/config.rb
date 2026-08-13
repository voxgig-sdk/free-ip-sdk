# FreeIp SDK configuration

module FreeIpConfig
  def self.make_config
    {
      "main" => {
        "name" => "FreeIp",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://free.freeipapi.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "ip_geolocation" => {},
          "json" => {},
        },
      },
      "entity" => {
        "ip_geolocation" => {
          "fields" => [],
          "name" => "ip_geolocation",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "1.1.1.1",
                        "kind" => "param",
                        "name" => "ip_address",
                        "orig" => "ip_address",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/xml/{ipAddress}",
                  "parts" => [
                    "api",
                    "xml",
                    "{ip_address}",
                  ],
                  "rename" => {
                    "param" => {
                      "ipAddress" => "ip_address",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "ip_address",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/xml",
                  "parts" => [
                    "api",
                    "xml",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "xml",
              ],
            ],
          },
        },
        "json" => {
          "fields" => [
            {
              "active" => true,
              "name" => "asn",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "asnOrganization",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "capital",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "cityName",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "code",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "continent",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "continentCode",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "countryCode",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "countryName",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "currencies",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "currency",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "ip",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 11,
            },
            {
              "active" => true,
              "name" => "ipAddress",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 12,
            },
            {
              "active" => true,
              "name" => "ipVersion",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 13,
            },
            {
              "active" => true,
              "name" => "isProxy",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 14,
            },
            {
              "active" => true,
              "name" => "language",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 15,
            },
            {
              "active" => true,
              "name" => "languages",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 16,
            },
            {
              "active" => true,
              "name" => "latitude",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 17,
            },
            {
              "active" => true,
              "name" => "longitude",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 18,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 19,
            },
            {
              "active" => true,
              "name" => "phoneCodes",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 20,
            },
            {
              "active" => true,
              "name" => "regionCode",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 21,
            },
            {
              "active" => true,
              "name" => "regionName",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 22,
            },
            {
              "active" => true,
              "name" => "timeZone",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 23,
            },
            {
              "active" => true,
              "name" => "timeZones",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 24,
            },
            {
              "active" => true,
              "name" => "tlds",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 25,
            },
            {
              "active" => true,
              "name" => "zipCode",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 26,
            },
          ],
          "name" => "json",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/json",
                  "parts" => [
                    "api",
                    "json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/json",
                  "parts" => [
                    "api",
                    "json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "193.247.239.168",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip_address",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/json/{ipAddress}",
                  "parts" => [
                    "api",
                    "json",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "ipAddress" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FreeIpFeatures.make_feature(name)
  end
end
