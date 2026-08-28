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
const result = await client.IpGeolocation().load({ ip_address: 'ip_address' })
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
| `asn` | `string` | No | Autonomous System Number |
| `asnOrganization` | `string` | No | Organization associated with the ASN |
| `capital` | `string` | No | Capital city of the country |
| `cityName` | `string` | No | City name |
| `code` | `string` | No |  |
| `continent` | `string` | No | Continent name |
| `continentCode` | `string` | No | Two-letter continent code |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `countryName` | `string` | No | Full country name |
| `currencies` | `any[]` | No | List of currencies used in the country |
| `currency` | `Record<string, any>` | No | Currency information for the country |
| `id` | `string` | No |  |
| `ip` | `string` | No | IPv4 or IPv6 address to lookup |
| `ipAddress` | `string` | No | The IP address that was looked up |
| `ipVersion` | `number` | No | IP version (4 for IPv4, 6 for IPv6) |
| `isProxy` | `boolean` | No | Whether the IP is detected as a proxy, VPN, or hosting service |
| `language` | `string` | No | Primary language code |
| `languages` | `any[]` | No | List of languages spoken in the country |
| `latitude` | `number` | No | Latitude coordinate |
| `longitude` | `number` | No | Longitude coordinate |
| `name` | `string` | No |  |
| `phoneCodes` | `any[]` | No | International dialing codes for the country |
| `regionCode` | `string` | No | Region or state code |
| `regionName` | `string` | No | Region or state name |
| `timeZone` | `string` | No | Timezone offset from UTC |
| `timeZones` | `any[]` | No | List of timezone identifiers for the location |
| `tlds` | `any[]` | No | Top-level domains for the country |
| `zipCode` | `string` | No | Postal/ZIP code |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

