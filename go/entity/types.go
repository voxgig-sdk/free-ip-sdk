// Typed models for the FreeIp SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/free-ip-sdk/go/core"
)

// IpGeolocation is the typed data model for the ip_geolocation entity.
type IpGeolocation struct {
}

// IpGeolocationLoadMatch is the typed request payload for IpGeolocation.LoadTyped.
type IpGeolocationLoadMatch struct {
	IpAddress *string `json:"ip_address,omitempty"`
}

// Json is the typed data model for the json entity.
type Json struct {
	Asn *string `json:"asn,omitempty"`
	AsnOrganization *string `json:"asnOrganization,omitempty"`
	Capital *string `json:"capital,omitempty"`
	CityName *string `json:"cityName,omitempty"`
	Code *string `json:"code,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continentCode,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	CountryName *string `json:"countryName,omitempty"`
	Currencies *[]any `json:"currencies,omitempty"`
	Currency *map[string]any `json:"currency,omitempty"`
	Ip *string `json:"ip,omitempty"`
	IpAddress *string `json:"ipAddress,omitempty"`
	IpVersion *int `json:"ipVersion,omitempty"`
	IsProxy *bool `json:"isProxy,omitempty"`
	Language *string `json:"language,omitempty"`
	Languages *[]any `json:"languages,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	PhoneCodes *[]any `json:"phoneCodes,omitempty"`
	RegionCode *string `json:"regionCode,omitempty"`
	RegionName *string `json:"regionName,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
	TimeZones *[]any `json:"timeZones,omitempty"`
	Tlds *[]any `json:"tlds,omitempty"`
	ZipCode *string `json:"zipCode,omitempty"`
}

// JsonLoadMatch is the typed request payload for Json.LoadTyped.
type JsonLoadMatch struct {
	Id string `json:"id"`
}

// JsonListMatch is the typed request payload for Json.ListTyped.
type JsonListMatch struct {
	Asn *string `json:"asn,omitempty"`
	AsnOrganization *string `json:"asnOrganization,omitempty"`
	Capital *string `json:"capital,omitempty"`
	CityName *string `json:"cityName,omitempty"`
	Code *string `json:"code,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continentCode,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	CountryName *string `json:"countryName,omitempty"`
	Currencies *[]any `json:"currencies,omitempty"`
	Currency *map[string]any `json:"currency,omitempty"`
	Ip *string `json:"ip,omitempty"`
	IpAddress *string `json:"ipAddress,omitempty"`
	IpVersion *int `json:"ipVersion,omitempty"`
	IsProxy *bool `json:"isProxy,omitempty"`
	Language *string `json:"language,omitempty"`
	Languages *[]any `json:"languages,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	PhoneCodes *[]any `json:"phoneCodes,omitempty"`
	RegionCode *string `json:"regionCode,omitempty"`
	RegionName *string `json:"regionName,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
	TimeZones *[]any `json:"timeZones,omitempty"`
	Tlds *[]any `json:"tlds,omitempty"`
	ZipCode *string `json:"zipCode,omitempty"`
}

// JsonCreateData is the typed request payload for Json.CreateTyped.
type JsonCreateData struct {
	Asn *string `json:"asn,omitempty"`
	AsnOrganization *string `json:"asnOrganization,omitempty"`
	Capital *string `json:"capital,omitempty"`
	CityName *string `json:"cityName,omitempty"`
	Code *string `json:"code,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continentCode,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	CountryName *string `json:"countryName,omitempty"`
	Currencies *[]any `json:"currencies,omitempty"`
	Currency *map[string]any `json:"currency,omitempty"`
	Ip *string `json:"ip,omitempty"`
	IpAddress *string `json:"ipAddress,omitempty"`
	IpVersion *int `json:"ipVersion,omitempty"`
	IsProxy *bool `json:"isProxy,omitempty"`
	Language *string `json:"language,omitempty"`
	Languages *[]any `json:"languages,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	PhoneCodes *[]any `json:"phoneCodes,omitempty"`
	RegionCode *string `json:"regionCode,omitempty"`
	RegionName *string `json:"regionName,omitempty"`
	TimeZone *string `json:"timeZone,omitempty"`
	TimeZones *[]any `json:"timeZones,omitempty"`
	Tlds *[]any `json:"tlds,omitempty"`
	ZipCode *string `json:"zipCode,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
