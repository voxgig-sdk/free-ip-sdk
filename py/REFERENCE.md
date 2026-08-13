# FreeIp Python SDK Reference

Complete API reference for the FreeIp Python SDK.


## FreeIpSDK

### Constructor

```python
from freeip_sdk import FreeIpSDK

client = FreeIpSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FreeIpSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FreeIpSDK.test()
```


### Instance Methods

#### `IpGeolocation(data=None)`

Create a new `IpGeolocationEntity` instance. Pass `None` for no initial data.

#### `Json(data=None)`

Create a new `JsonEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## IpGeolocationEntity

```python
ip_geolocation = client.IpGeolocation()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IpGeolocation().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpGeolocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JsonEntity

```python
json = client.Json()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `str` | No |  |
| `asnOrganization` | `str` | No |  |
| `capital` | `str` | No |  |
| `cityName` | `str` | No |  |
| `code` | `str` | No |  |
| `continent` | `str` | No |  |
| `continentCode` | `str` | No |  |
| `countryCode` | `str` | No |  |
| `countryName` | `str` | No |  |
| `currencies` | `list` | No |  |
| `currency` | `dict` | No |  |
| `ip` | `str` | No |  |
| `ipAddress` | `str` | No |  |
| `ipVersion` | `int` | No |  |
| `isProxy` | `bool` | No |  |
| `language` | `str` | No |  |
| `languages` | `list` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `name` | `str` | No |  |
| `phoneCodes` | `list` | No |  |
| `regionCode` | `str` | No |  |
| `regionName` | `str` | No |  |
| `timeZone` | `str` | No |  |
| `timeZones` | `list` | No |  |
| `tlds` | `list` | No |  |
| `zipCode` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Json().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Json().list()
for json in results:
    print(json)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Json().load({"id": "json_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JsonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = FreeIpSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

