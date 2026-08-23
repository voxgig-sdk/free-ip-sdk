# FreeIp SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FreeIp",
            "slug": "free-ip",
            "version": "0.0.1",
            "target": "py",
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
                "args": {
                  "params": [
                    {
                      "example": "1.1.1.1",
                      "kind": "param",
                      "name": "ip_address",
                      "orig": "ip_address",
                      "reqd": True,
                      "type": "`$STRING`",
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
              },
              {
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
              },
            ],
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
            "name": "asn",
            "short": "Autonomous System Number",
            "type": "`$STRING`",
          },
          {
            "name": "asnOrganization",
            "short": "Organization associated with the ASN",
            "type": "`$STRING`",
          },
          {
            "name": "capital",
            "short": "Capital city of the country",
            "type": "`$STRING`",
          },
          {
            "name": "cityName",
            "short": "City name",
            "type": "`$STRING`",
          },
          {
            "name": "code",
            "type": "`$STRING`",
          },
          {
            "name": "continent",
            "short": "Continent name",
            "type": "`$STRING`",
          },
          {
            "name": "continentCode",
            "short": "Two-letter continent code",
            "type": "`$STRING`",
          },
          {
            "name": "countryCode",
            "short": "ISO 3166-1 alpha-2 country code",
            "type": "`$STRING`",
          },
          {
            "name": "countryName",
            "short": "Full country name",
            "type": "`$STRING`",
          },
          {
            "name": "currencies",
            "short": "List of currencies used in the country",
            "type": "`$ARRAY`",
          },
          {
            "name": "currency",
            "short": "Currency information for the country",
            "type": "`$OBJECT`",
          },
          {
            "name": "ip",
            "short": "IPv4 or IPv6 address to lookup",
            "type": "`$STRING`",
          },
          {
            "name": "ipAddress",
            "short": "The IP address that was looked up",
            "type": "`$STRING`",
          },
          {
            "name": "ipVersion",
            "short": "IP version (4 for IPv4, 6 for IPv6)",
            "type": "`$INTEGER`",
          },
          {
            "name": "isProxy",
            "short": "Whether the IP is detected as a proxy, VPN, or hosting service",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "language",
            "short": "Primary language code",
            "type": "`$STRING`",
          },
          {
            "name": "languages",
            "short": "List of languages spoken in the country",
            "type": "`$ARRAY`",
          },
          {
            "name": "latitude",
            "short": "Latitude coordinate",
            "type": "`$NUMBER`",
          },
          {
            "name": "longitude",
            "short": "Longitude coordinate",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "phoneCodes",
            "short": "International dialing codes for the country",
            "type": "`$ARRAY`",
          },
          {
            "name": "regionCode",
            "short": "Region or state code",
            "type": "`$STRING`",
          },
          {
            "name": "regionName",
            "short": "Region or state name",
            "type": "`$STRING`",
          },
          {
            "name": "timeZone",
            "short": "Timezone offset from UTC",
            "type": "`$STRING`",
          },
          {
            "name": "timeZones",
            "short": "List of timezone identifiers for the location",
            "type": "`$ARRAY`",
          },
          {
            "name": "tlds",
            "short": "Top-level domains for the country",
            "type": "`$ARRAY`",
          },
          {
            "name": "zipCode",
            "short": "Postal/ZIP code",
            "type": "`$STRING`",
          },
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
                  "json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                  "json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
