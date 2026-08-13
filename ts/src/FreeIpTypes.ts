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
  asnOrganization?: string
  capital?: string
  cityName?: string
  code?: string
  continent?: string
  continentCode?: string
  countryCode?: string
  countryName?: string
  currencies?: any[]
  currency?: Record<string, any>
  ip?: string
  ipAddress?: string
  ipVersion?: number
  isProxy?: boolean
  language?: string
  languages?: any[]
  latitude?: number
  longitude?: number
  name?: string
  phoneCodes?: any[]
  regionCode?: string
  regionName?: string
  timeZone?: string
  timeZones?: any[]
  tlds?: any[]
  zipCode?: string
}

export interface JsonLoadMatch {
  id: string
}

export interface JsonListMatch {
  asn?: string
  asnOrganization?: string
  capital?: string
  cityName?: string
  code?: string
  continent?: string
  continentCode?: string
  countryCode?: string
  countryName?: string
  currencies?: any[]
  currency?: Record<string, any>
  ip?: string
  ipAddress?: string
  ipVersion?: number
  isProxy?: boolean
  language?: string
  languages?: any[]
  latitude?: number
  longitude?: number
  name?: string
  phoneCodes?: any[]
  regionCode?: string
  regionName?: string
  timeZone?: string
  timeZones?: any[]
  tlds?: any[]
  zipCode?: string
}

export interface JsonCreateData {
  asn?: string
  asnOrganization?: string
  capital?: string
  cityName?: string
  code?: string
  continent?: string
  continentCode?: string
  countryCode?: string
  countryName?: string
  currencies?: any[]
  currency?: Record<string, any>
  ip?: string
  ipAddress?: string
  ipVersion?: number
  isProxy?: boolean
  language?: string
  languages?: any[]
  latitude?: number
  longitude?: number
  name?: string
  phoneCodes?: any[]
  regionCode?: string
  regionName?: string
  timeZone?: string
  timeZones?: any[]
  tlds?: any[]
  zipCode?: string
}

