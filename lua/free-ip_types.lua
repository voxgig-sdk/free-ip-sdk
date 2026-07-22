-- Typed models for the FreeIp SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class IpGeolocation

---@class IpGeolocationLoadMatch
---@field ip_address? string

---@class Json
---@field asn? string
---@field asn_organization? string
---@field capital? string
---@field city_name? string
---@field code? string
---@field continent? string
---@field continent_code? string
---@field country_code? string
---@field country_name? string
---@field currency? table
---@field ip? string
---@field ip_address? string
---@field ip_version? number
---@field is_proxy? boolean
---@field language? string
---@field latitude? number
---@field longitude? number
---@field name? string
---@field phone_code? table
---@field region_code? string
---@field region_name? string
---@field time_zone? string
---@field tld? table
---@field zip_code? string

---@class JsonLoadMatch
---@field id string

---@class JsonListMatch
---@field asn? string
---@field asn_organization? string
---@field capital? string
---@field city_name? string
---@field code? string
---@field continent? string
---@field continent_code? string
---@field country_code? string
---@field country_name? string
---@field currency? table
---@field ip? string
---@field ip_address? string
---@field ip_version? number
---@field is_proxy? boolean
---@field language? string
---@field latitude? number
---@field longitude? number
---@field name? string
---@field phone_code? table
---@field region_code? string
---@field region_name? string
---@field time_zone? string
---@field tld? table
---@field zip_code? string

---@class JsonCreateData
---@field asn? string
---@field asn_organization? string
---@field capital? string
---@field city_name? string
---@field code? string
---@field continent? string
---@field continent_code? string
---@field country_code? string
---@field country_name? string
---@field currency? table
---@field ip? string
---@field ip_address? string
---@field ip_version? number
---@field is_proxy? boolean
---@field language? string
---@field latitude? number
---@field longitude? number
---@field name? string
---@field phone_code? table
---@field region_code? string
---@field region_name? string
---@field time_zone? string
---@field tld? table
---@field zip_code? string

local M = {}

return M
