# FreeIp Golang SDK Reference

Complete API reference for the FreeIp Golang SDK.


## FreeIpSDK

### Constructor

```go
func NewFreeIpSDK(options map[string]any) *FreeIpSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *FreeIpSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *FreeIpSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `IpGeolocation(data map[string]any) FreeIpEntity`

Create a new `IpGeolocation` entity instance. Pass `nil` for no initial data.

#### `Json(data map[string]any) FreeIpEntity`

Create a new `Json` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## IpGeolocationEntity

```go
ipGeolocation := client.IpGeolocation(nil)
fmt.Println(ipGeolocation.GetName()) // "ip_geolocation"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IpGeolocation(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IpGeolocationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## JsonEntity

```go
json := client.Json(nil)
fmt.Println(json.GetName()) // "json"
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
| `currencies` | `[]any` | No |  |
| `currency` | `map[string]any` | No |  |
| `ip` | `string` | No |  |
| `ipAddress` | `string` | No |  |
| `ipVersion` | `int` | No |  |
| `isProxy` | `bool` | No |  |
| `language` | `string` | No |  |
| `languages` | `[]any` | No |  |
| `latitude` | `float64` | No |  |
| `longitude` | `float64` | No |  |
| `name` | `string` | No |  |
| `phoneCodes` | `[]any` | No |  |
| `regionCode` | `string` | No |  |
| `regionName` | `string` | No |  |
| `timeZone` | `string` | No |  |
| `timeZones` | `[]any` | No |  |
| `tlds` | `[]any` | No |  |
| `zipCode` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Json(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Json(nil).Load(map[string]any{"id": "json_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Json(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `JsonEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewFreeIpSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

