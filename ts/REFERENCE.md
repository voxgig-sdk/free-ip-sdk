# FreeIp TypeScript SDK Reference

Complete API reference for the FreeIp TypeScript SDK.


## FreeIpSDK

### Constructor

```ts
new FreeIpSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FreeIpSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FreeIpSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FreeIpSDK` instance in test mode.


### Instance Methods

#### `IpGeolocation(data?: object)`

Create a new `IpGeolocation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IpGeolocationEntity` instance.

#### `Json(data?: object)`

Create a new `Json` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `JsonEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FreeIpSDK.test()`.

**Returns:** `FreeIpSDK` instance in test mode.


---

## IpGeolocationEntity

```ts
const ip_geolocation = client.IpGeolocation()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IpGeolocation().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IpGeolocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `FreeIpSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## JsonEntity

```ts
const json = client.Json()
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
| `currencies` | `any[]` | No |  |
| `currency` | `Record<string, any>` | No |  |
| `ip` | `string` | No |  |
| `ipAddress` | `string` | No |  |
| `ipVersion` | `number` | No |  |
| `isProxy` | `boolean` | No |  |
| `language` | `string` | No |  |
| `languages` | `any[]` | No |  |
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |
| `name` | `string` | No |  |
| `phoneCodes` | `any[]` | No |  |
| `regionCode` | `string` | No |  |
| `regionName` | `string` | No |  |
| `timeZone` | `string` | No |  |
| `timeZones` | `any[]` | No |  |
| `tlds` | `any[]` | No |  |
| `zipCode` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Json().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Json().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Json().load({ id: 'json_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `JsonEntity` instance with the same client and
options.

#### `client()`

Return the parent `FreeIpSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new FreeIpSDK({
  feature: {
    test: { active: true },
  }
})
```

