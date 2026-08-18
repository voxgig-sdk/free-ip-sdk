# FreeIp SDK configuration

module FreeIpConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
                  "args" => {
                    "params" => [
                      {
                        "example" => "1.1.1.1",
                        "kind" => "param",
                        "name" => "ip_address",
                        "orig" => "ip_address",
                        "reqd" => true,
                        "type" => "`$STRING`",
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
                },
                {
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
                },
              ],
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
              "name" => "asn",
              "type" => "`$STRING`",
            },
            {
              "name" => "asnOrganization",
              "type" => "`$STRING`",
            },
            {
              "name" => "capital",
              "type" => "`$STRING`",
            },
            {
              "name" => "cityName",
              "type" => "`$STRING`",
            },
            {
              "name" => "code",
              "type" => "`$STRING`",
            },
            {
              "name" => "continent",
              "type" => "`$STRING`",
            },
            {
              "name" => "continentCode",
              "type" => "`$STRING`",
            },
            {
              "name" => "countryCode",
              "type" => "`$STRING`",
            },
            {
              "name" => "countryName",
              "type" => "`$STRING`",
            },
            {
              "name" => "currencies",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "currency",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "ip",
              "type" => "`$STRING`",
            },
            {
              "name" => "ipAddress",
              "type" => "`$STRING`",
            },
            {
              "name" => "ipVersion",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "isProxy",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "language",
              "type" => "`$STRING`",
            },
            {
              "name" => "languages",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "latitude",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "longitude",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "phoneCodes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "regionCode",
              "type" => "`$STRING`",
            },
            {
              "name" => "regionName",
              "type" => "`$STRING`",
            },
            {
              "name" => "timeZone",
              "type" => "`$STRING`",
            },
            {
              "name" => "timeZones",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "tlds",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "zipCode",
              "type" => "`$STRING`",
            },
          ],
          "name" => "json",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
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
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
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
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "193.247.239.168",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip_address",
                        "reqd" => true,
                        "type" => "`$STRING`",
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
                },
              ],
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
