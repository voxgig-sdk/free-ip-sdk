# FreeIp Ruby SDK



The Ruby SDK for the FreeIp API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.IpGeolocation` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/free-ip-sdk/releases](https://github.com/voxgig-sdk/free-ip-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "FreeIp_sdk"

client = FreeIpSDK.new
```

### 3. Load an ipgeolocation

IpGeolocation is nested under ip_address, so provide the `ip_address`.

```ruby
begin
  # load returns the ENTITY — call data_get for the IpGeolocation record (raises on error).
  ipgeolocation = client.IpGeolocation.load({ "ip_address" => "example_ip_address" })
  puts ipgeolocation
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  ipgeolocation = client.IpGeolocation.load({ "ip_address" => "example" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = FreeIpSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
ipgeolocation = client.IpGeolocation.load({ "ip_address" => "example" })
puts ipgeolocation
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = FreeIpSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FREE_IP_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### FreeIpSDK

```ruby
require_relative "FreeIp_sdk"
client = FreeIpSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = FreeIpSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FreeIpSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `IpGeolocation` | `(data) -> IpGeolocationEntity` | Create an IpGeolocation entity instance. |
| `Json` | `(data) -> JsonEntity` | Create a Json entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `FreeIpError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### IpGeolocation

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/xml/{ipAddress}`

#### Json

| Field | Description |
| --- | --- |
| `asn` | Autonomous System Number |
| `asnOrganization` | Organization associated with the ASN |
| `capital` | Capital city of the country |
| `cityName` | City name |
| `code` |  |
| `continent` | Continent name |
| `continentCode` | Two-letter continent code |
| `countryCode` | ISO 3166-1 alpha-2 country code |
| `countryName` | Full country name |
| `currencies` | List of currencies used in the country |
| `currency` | Currency information for the country |
| `id` |  |
| `ip` | IPv4 or IPv6 address to lookup |
| `ipAddress` | The IP address that was looked up |
| `ipVersion` | IP version (4 for IPv4, 6 for IPv6) |
| `isProxy` | Whether the IP is detected as a proxy, VPN, or hosting service |
| `language` | Primary language code |
| `languages` | List of languages spoken in the country |
| `latitude` | Latitude coordinate |
| `longitude` | Longitude coordinate |
| `name` |  |
| `phoneCodes` | International dialing codes for the country |
| `regionCode` | Region or state code |
| `regionName` | Region or state name |
| `timeZone` | Timezone offset from UTC |
| `timeZones` | List of timezone identifiers for the location |
| `tlds` | Top-level domains for the country |
| `zipCode` | Postal/ZIP code |

Operations: Create, List, Load.

API path: `/api/json`



## Entities


### IpGeolocation

Create an instance: `ip_geolocation = client.IpGeolocation`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the IpGeolocation record (raises on error).
ip_geolocation = client.IpGeolocation.load({ "ip_address" => "ip_address" })
```


### Json

Create an instance: `json = client.Json`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `String` | Autonomous System Number |
| `asnOrganization` | `String` | Organization associated with the ASN |
| `capital` | `String` | Capital city of the country |
| `cityName` | `String` | City name |
| `code` | `String` |  |
| `continent` | `String` | Continent name |
| `continentCode` | `String` | Two-letter continent code |
| `countryCode` | `String` | ISO 3166-1 alpha-2 country code |
| `countryName` | `String` | Full country name |
| `currencies` | `Array` | List of currencies used in the country |
| `currency` | `Hash` | Currency information for the country |
| `id` | `String` |  |
| `ip` | `String` | IPv4 or IPv6 address to lookup |
| `ipAddress` | `String` | The IP address that was looked up |
| `ipVersion` | `Integer` | IP version (4 for IPv4, 6 for IPv6) |
| `isProxy` | `Boolean` | Whether the IP is detected as a proxy, VPN, or hosting service |
| `language` | `String` | Primary language code |
| `languages` | `Array` | List of languages spoken in the country |
| `latitude` | `Float` | Latitude coordinate |
| `longitude` | `Float` | Longitude coordinate |
| `name` | `String` |  |
| `phoneCodes` | `Array` | International dialing codes for the country |
| `regionCode` | `String` | Region or state code |
| `regionName` | `String` | Region or state name |
| `timeZone` | `String` | Timezone offset from UTC |
| `timeZones` | `Array` | List of timezone identifiers for the location |
| `tlds` | `Array` | Top-level domains for the country |
| `zipCode` | `String` | Postal/ZIP code |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Json record (raises on error).
json = client.Json.load({ "id" => "json_id" })
```

#### Example: List

```ruby
# list returns an Array of Json records (raises on error).
jsons = client.Json.list
```

#### Example: Create

```ruby
json = client.Json.create({
})
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── FreeIp_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`FreeIp_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
ipgeolocation = client.IpGeolocation
ipgeolocation.load({ "ip_address" => "example" })

# ipgeolocation.data_get now returns the ipgeolocation data from the last load
# ipgeolocation.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
