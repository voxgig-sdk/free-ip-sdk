# FreeIp PHP SDK Reference

Complete API reference for the FreeIp PHP SDK.


## FreeIpSDK

### Constructor

```php
require_once __DIR__ . '/freeip_sdk.php';

$client = new FreeIpSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FreeIpSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = FreeIpSDK::test();
```


### Instance Methods

#### `IpGeolocation($data = null)`

Create a new `IpGeolocationEntity` instance. Pass `null` for no initial data.

#### `Json($data = null)`

Create a new `JsonEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): FreeIpUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## IpGeolocationEntity

```php
$ip_geolocation = $client->IpGeolocation();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IpGeolocation()->load(["ip_address" => "ip_address"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IpGeolocationEntity`

Create a new `IpGeolocationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## JsonEntity

```php
$json = $client->Json();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `string` | No | Autonomous System Number |
| `asnOrganization` | `string` | No | Organization associated with the ASN |
| `capital` | `string` | No | Capital city of the country |
| `cityName` | `string` | No | City name |
| `code` | `string` | No |  |
| `continent` | `string` | No | Continent name |
| `continentCode` | `string` | No | Two-letter continent code |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `countryName` | `string` | No | Full country name |
| `currencies` | `array` | No | List of currencies used in the country |
| `currency` | `array` | No | Currency information for the country |
| `ip` | `string` | No | IPv4 or IPv6 address to lookup |
| `ipAddress` | `string` | No | The IP address that was looked up |
| `ipVersion` | `int` | No | IP version (4 for IPv4, 6 for IPv6) |
| `isProxy` | `bool` | No | Whether the IP is detected as a proxy, VPN, or hosting service |
| `language` | `string` | No | Primary language code |
| `languages` | `array` | No | List of languages spoken in the country |
| `latitude` | `float` | No | Latitude coordinate |
| `longitude` | `float` | No | Longitude coordinate |
| `name` | `string` | No |  |
| `phoneCodes` | `array` | No | International dialing codes for the country |
| `regionCode` | `string` | No | Region or state code |
| `regionName` | `string` | No | Region or state name |
| `timeZone` | `string` | No | Timezone offset from UTC |
| `timeZones` | `array` | No | List of timezone identifiers for the location |
| `tlds` | `array` | No | Top-level domains for the country |
| `zipCode` | `string` | No | Postal/ZIP code |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Json()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Json()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Json()->load(["id" => "json_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): JsonEntity`

Create a new `JsonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new FreeIpSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

