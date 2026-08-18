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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
                  'select' => [
                    'exist' => [
                      'ip_address',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/xml',
                  'parts' => [
                    'api',
                    'xml',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'asnOrganization',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'capital',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cityName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'continent',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'continentCode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'countryCode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'countryName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currencies',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'currency',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'ip',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ipAddress',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ipVersion',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'isProxy',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'language',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'languages',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'latitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'longitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phoneCodes',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'regionCode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'regionName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timeZone',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timeZones',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'tlds',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'zipCode',
              'type' => '`$STRING`',
            ],
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
                  'parts' => [
                    'api',
                    'json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
                  'parts' => [
                    'api',
                    'json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
