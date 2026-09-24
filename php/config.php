<?php
declare(strict_types=1);

// FreeIp SDK configuration

class FreeIpConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FreeIp",
                "slug" => "free-ip",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://free.freeipapi.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "ip_geolocation" => [],
                    "json" => [],
                ],
            ],
            "entity" => [
        'ip_geolocation' => [
          'fields' => [],
          'name' => 'ip_geolocation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/xml/{ipAddress}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'xml',
                    ],
                    [
                      'var' => 'ip_address',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'xml',
                    '{ip_address}',
                  ],
                  'rename' => [
                    'param' => [
                      'ipAddress' => 'ip_address',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'ip_address',
                        'orig' => 'ip_address',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '1.1.1.1',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip_address',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/xml',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'xml',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'xml',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'json' => [
          'fields' => [
            [
              'name' => 'asn',
              'title' => 'Asn',
              'type' => '`$STRING`',
              'short' => 'Autonomous System Number',
            ],
            [
              'name' => 'asnOrganization',
              'title' => 'Asn Organization',
              'type' => '`$STRING`',
              'short' => 'Organization associated with the ASN',
            ],
            [
              'name' => 'capital',
              'title' => 'Capital',
              'type' => '`$STRING`',
              'short' => 'Capital city of the country',
            ],
            [
              'name' => 'cityName',
              'title' => 'City Name',
              'type' => '`$STRING`',
              'short' => 'City name',
            ],
            [
              'name' => 'code',
              'title' => 'Code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'continent',
              'title' => 'Continent',
              'type' => '`$STRING`',
              'short' => 'Continent name',
            ],
            [
              'name' => 'continentCode',
              'title' => 'Continent Code',
              'type' => '`$STRING`',
              'short' => 'Two-letter continent code',
            ],
            [
              'name' => 'countryCode',
              'title' => 'Country Code',
              'type' => '`$STRING`',
              'short' => 'ISO 3166-1 alpha-2 country code',
            ],
            [
              'name' => 'countryName',
              'title' => 'Country Name',
              'type' => '`$STRING`',
              'short' => 'Full country name',
            ],
            [
              'name' => 'currencies',
              'title' => 'Currencies',
              'type' => '`$ARRAY`',
              'short' => 'List of currencies used in the country',
            ],
            [
              'name' => 'currency',
              'title' => 'Currency',
              'type' => '`$OBJECT`',
              'short' => 'Currency information for the country',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'short' => 'IPv4 or IPv6 address to lookup',
            ],
            [
              'name' => 'ipAddress',
              'title' => 'Ip Address',
              'type' => '`$STRING`',
              'short' => 'The IP address that was looked up',
            ],
            [
              'name' => 'ipVersion',
              'title' => 'Ip Version',
              'type' => '`$INTEGER`',
              'short' => 'IP version (4 for IPv4, 6 for IPv6)',
            ],
            [
              'name' => 'isProxy',
              'title' => 'Is Proxy',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the IP is detected as a proxy, VPN, or hosting service',
            ],
            [
              'name' => 'language',
              'title' => 'Language',
              'type' => '`$STRING`',
              'short' => 'Primary language code',
            ],
            [
              'name' => 'languages',
              'title' => 'Languages',
              'type' => '`$ARRAY`',
              'short' => 'List of languages spoken in the country',
            ],
            [
              'name' => 'latitude',
              'title' => 'Latitude',
              'type' => '`$NUMBER`',
              'short' => 'Latitude coordinate',
              'format' => 'double',
            ],
            [
              'name' => 'longitude',
              'title' => 'Longitude',
              'type' => '`$NUMBER`',
              'short' => 'Longitude coordinate',
              'format' => 'double',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phoneCodes',
              'title' => 'Phone Codes',
              'type' => '`$ARRAY`',
              'short' => 'International dialing codes for the country',
            ],
            [
              'name' => 'regionCode',
              'title' => 'Region Code',
              'type' => '`$STRING`',
              'short' => 'Region or state code',
            ],
            [
              'name' => 'regionName',
              'title' => 'Region Name',
              'type' => '`$STRING`',
              'short' => 'Region or state name',
            ],
            [
              'name' => 'timeZone',
              'title' => 'Time Zone',
              'type' => '`$STRING`',
              'short' => 'Timezone offset from UTC',
            ],
            [
              'name' => 'timeZones',
              'title' => 'Time Zones',
              'type' => '`$ARRAY`',
              'short' => 'List of timezone identifiers for the location',
            ],
            [
              'name' => 'tlds',
              'title' => 'Tlds',
              'type' => '`$ARRAY`',
              'short' => 'Top-level domains for the country',
            ],
            [
              'name' => 'zipCode',
              'title' => 'Zip Code',
              'type' => '`$STRING`',
              'short' => 'Postal/ZIP code',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'json',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/json',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'json',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/json',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'json',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/json/{ipAddress}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'json',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'json',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ipAddress' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'ip_address',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '193.247.239.168',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FreeIpFeatures::make_feature($name);
    }
}
