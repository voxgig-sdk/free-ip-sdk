// Typed models for the FreeIp SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface IpGeolocation {
}

export interface IpGeolocationLoadMatch {
  ip_address?: string
}

export interface Json {
  asn?: string
  asn_organization?: string
  capital?: string
  city_name?: string
  code?: string
  continent?: string
  continent_code?: string
  country_code?: string
  country_name?: string
  currency?: any[]
  ip?: string
  ip_address?: string
  ip_version?: number
  is_proxy?: boolean
  language?: string
  latitude?: number
  longitude?: number
  name?: string
  phone_code?: any[]
  region_code?: string
  region_name?: string
  time_zone?: string
  tld?: any[]
  zip_code?: string
}

export interface JsonLoadMatch {
  id: string
}

export interface JsonListMatch {
  asn?: string
  asn_organization?: string
  capital?: string
  city_name?: string
  code?: string
  continent?: string
  continent_code?: string
  country_code?: string
  country_name?: string
  currency?: any[]
  ip?: string
  ip_address?: string
  ip_version?: number
  is_proxy?: boolean
  language?: string
  latitude?: number
  longitude?: number
  name?: string
  phone_code?: any[]
  region_code?: string
  region_name?: string
  time_zone?: string
  tld?: any[]
  zip_code?: string
}

export interface JsonCreateData {
  asn?: string
  asn_organization?: string
  capital?: string
  city_name?: string
  code?: string
  continent?: string
  continent_code?: string
  country_code?: string
  country_name?: string
  currency?: any[]
  ip?: string
  ip_address?: string
  ip_version?: number
  is_proxy?: boolean
  language?: string
  latitude?: number
  longitude?: number
  name?: string
  phone_code?: any[]
  region_code?: string
  region_name?: string
  time_zone?: string
  tld?: any[]
  zip_code?: string
}

