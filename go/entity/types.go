// Typed models for the FreeIp SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

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
	AsnOrganization *string `json:"asn_organization,omitempty"`
	Capital *string `json:"capital,omitempty"`
	CityName *string `json:"city_name,omitempty"`
	Code *string `json:"code,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continent_code,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	CountryName *string `json:"country_name,omitempty"`
	Currency *[]any `json:"currency,omitempty"`
	Ip *string `json:"ip,omitempty"`
	IpAddress *string `json:"ip_address,omitempty"`
	IpVersion *int `json:"ip_version,omitempty"`
	IsProxy *bool `json:"is_proxy,omitempty"`
	Language *string `json:"language,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	PhoneCode *[]any `json:"phone_code,omitempty"`
	RegionCode *string `json:"region_code,omitempty"`
	RegionName *string `json:"region_name,omitempty"`
	TimeZone *string `json:"time_zone,omitempty"`
	Tld *[]any `json:"tld,omitempty"`
	ZipCode *string `json:"zip_code,omitempty"`
}

// JsonLoadMatch is the typed request payload for Json.LoadTyped.
type JsonLoadMatch struct {
	Id string `json:"id"`
}

// JsonListMatch is the typed request payload for Json.ListTyped.
type JsonListMatch struct {
	Asn *string `json:"asn,omitempty"`
	AsnOrganization *string `json:"asn_organization,omitempty"`
	Capital *string `json:"capital,omitempty"`
	CityName *string `json:"city_name,omitempty"`
	Code *string `json:"code,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continent_code,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	CountryName *string `json:"country_name,omitempty"`
	Currency *[]any `json:"currency,omitempty"`
	Ip *string `json:"ip,omitempty"`
	IpAddress *string `json:"ip_address,omitempty"`
	IpVersion *int `json:"ip_version,omitempty"`
	IsProxy *bool `json:"is_proxy,omitempty"`
	Language *string `json:"language,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	PhoneCode *[]any `json:"phone_code,omitempty"`
	RegionCode *string `json:"region_code,omitempty"`
	RegionName *string `json:"region_name,omitempty"`
	TimeZone *string `json:"time_zone,omitempty"`
	Tld *[]any `json:"tld,omitempty"`
	ZipCode *string `json:"zip_code,omitempty"`
}

// JsonCreateData is the typed request payload for Json.CreateTyped.
type JsonCreateData struct {
	Asn *string `json:"asn,omitempty"`
	AsnOrganization *string `json:"asn_organization,omitempty"`
	Capital *string `json:"capital,omitempty"`
	CityName *string `json:"city_name,omitempty"`
	Code *string `json:"code,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continent_code,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	CountryName *string `json:"country_name,omitempty"`
	Currency *[]any `json:"currency,omitempty"`
	Ip *string `json:"ip,omitempty"`
	IpAddress *string `json:"ip_address,omitempty"`
	IpVersion *int `json:"ip_version,omitempty"`
	IsProxy *bool `json:"is_proxy,omitempty"`
	Language *string `json:"language,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	PhoneCode *[]any `json:"phone_code,omitempty"`
	RegionCode *string `json:"region_code,omitempty"`
	RegionName *string `json:"region_name,omitempty"`
	TimeZone *string `json:"time_zone,omitempty"`
	Tld *[]any `json:"tld,omitempty"`
	ZipCode *string `json:"zip_code,omitempty"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
