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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
                  'args' => [
                    'params' => [
                      [
                        'example' => '1.1.1.1',
                        'kind' => 'param',
                        'name' => 'ip_address',
                        'orig' => 'ip_address',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/xml/{ipAddress}',
                  'rename' => [
                    'param' => [
                      'ipAddress' => 'ip_address',
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'ip_address',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'xml',
                    '{ip_address}',
                  ],
                ],
                [
                  'args' => [],
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
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'xml',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'xml',
              ],
            ],
          ],
        ],
        'json' => [
          'fields' => [
            [
              'name' => 'asn',
              'short' => 'Autonomous System Number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'asnOrganization',
              'short' => 'Organization associated with the ASN',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'capital',
              'short' => 'Capital city of the country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cityName',
              'short' => 'City name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'continent',
              'short' => 'Continent name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'continentCode',
              'short' => 'Two-letter continent code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'countryCode',
              'short' => 'ISO 3166-1 alpha-2 country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'countryName',
              'short' => 'Full country name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currencies',
              'short' => 'List of currencies used in the country',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'currency',
              'short' => 'Currency information for the country',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'short' => 'IPv4 or IPv6 address to lookup',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ipAddress',
              'short' => 'The IP address that was looked up',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ipVersion',
              'short' => 'IP version (4 for IPv4, 6 for IPv6)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'isProxy',
              'short' => 'Whether the IP is detected as a proxy, VPN, or hosting service',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'language',
              'short' => 'Primary language code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'languages',
              'short' => 'List of languages spoken in the country',
              'type' => '`$ARRAY`',
            ],
            [
              'format' => 'double',
              'name' => 'latitude',
              'short' => 'Latitude coordinate',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'longitude',
              'short' => 'Longitude coordinate',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phoneCodes',
              'short' => 'International dialing codes for the country',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'regionCode',
              'short' => 'Region or state code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'regionName',
              'short' => 'Region or state name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timeZone',
              'short' => 'Timezone offset from UTC',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timeZones',
              'short' => 'List of timezone identifiers for the location',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'tlds',
              'short' => 'Top-level domains for the country',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'zipCode',
              'short' => 'Postal/ZIP code',
              'type' => '`$STRING`',
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
                  'args' => [],
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
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'json',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
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
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'json',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '193.247.239.168',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'ip_address',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/json/{ipAddress}',
                  'rename' => [
                    'param' => [
                      'ipAddress' => 'id',
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'json',
                    '{id}',
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
