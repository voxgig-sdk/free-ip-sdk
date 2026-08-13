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
$result = $client->IpGeolocation()->load();
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
| `asn` | `string` | No |  |
| `asnOrganization` | `string` | No |  |
| `capital` | `string` | No |  |
| `cityName` | `string` | No |  |
| `code` | `string` | No |  |
| `continent` | `string` | No |  |
| `continentCode` | `string` | No |  |
| `countryCode` | `string` | No |  |
| `countryName` | `string` | No |  |
| `currencies` | `array` | No |  |
| `currency` | `array` | No |  |
| `ip` | `string` | No |  |
| `ipAddress` | `string` | No |  |
| `ipVersion` | `int` | No |  |
| `isProxy` | `bool` | No |  |
| `language` | `string` | No |  |
| `languages` | `array` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `name` | `string` | No |  |
| `phoneCodes` | `array` | No |  |
| `regionCode` | `string` | No |  |
| `regionName` | `string` | No |  |
| `timeZone` | `string` | No |  |
| `timeZones` | `array` | No |  |
| `tlds` | `array` | No |  |
| `zipCode` | `string` | No |  |

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

