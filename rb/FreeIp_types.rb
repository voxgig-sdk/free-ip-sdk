# frozen_string_literal: true

# Typed models for the FreeIp SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# IpGeolocation entity data model.
class IpGeolocation
end

# Request payload for IpGeolocation#load.
#
# @!attribute [rw] ip_address
#   @return [String, nil]
IpGeolocationLoadMatch = Struct.new(
  :ip_address,
  keyword_init: true
)

# Json entity data model.
#
# @!attribute [rw] asn
#   @return [String, nil]
#
# @!attribute [rw] asn_organization
#   @return [String, nil]
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] city_name
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] continent
#   @return [String, nil]
#
# @!attribute [rw] continent_code
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] country_name
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [Array, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] ip_address
#   @return [String, nil]
#
# @!attribute [rw] ip_version
#   @return [Integer, nil]
#
# @!attribute [rw] is_proxy
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone_code
#   @return [Array, nil]
#
# @!attribute [rw] region_code
#   @return [String, nil]
#
# @!attribute [rw] region_name
#   @return [String, nil]
#
# @!attribute [rw] time_zone
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [Array, nil]
#
# @!attribute [rw] zip_code
#   @return [String, nil]
Json = Struct.new(
  :asn,
  :asn_organization,
  :capital,
  :city_name,
  :code,
  :continent,
  :continent_code,
  :country_code,
  :country_name,
  :currency,
  :ip,
  :ip_address,
  :ip_version,
  :is_proxy,
  :language,
  :latitude,
  :longitude,
  :name,
  :phone_code,
  :region_code,
  :region_name,
  :time_zone,
  :tld,
  :zip_code,
  keyword_init: true
)

# Request payload for Json#load.
#
# @!attribute [rw] id
#   @return [String]
JsonLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Json#list.
#
# @!attribute [rw] asn
#   @return [String, nil]
#
# @!attribute [rw] asn_organization
#   @return [String, nil]
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] city_name
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] continent
#   @return [String, nil]
#
# @!attribute [rw] continent_code
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] country_name
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [Array, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] ip_address
#   @return [String, nil]
#
# @!attribute [rw] ip_version
#   @return [Integer, nil]
#
# @!attribute [rw] is_proxy
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone_code
#   @return [Array, nil]
#
# @!attribute [rw] region_code
#   @return [String, nil]
#
# @!attribute [rw] region_name
#   @return [String, nil]
#
# @!attribute [rw] time_zone
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [Array, nil]
#
# @!attribute [rw] zip_code
#   @return [String, nil]
JsonListMatch = Struct.new(
  :asn,
  :asn_organization,
  :capital,
  :city_name,
  :code,
  :continent,
  :continent_code,
  :country_code,
  :country_name,
  :currency,
  :ip,
  :ip_address,
  :ip_version,
  :is_proxy,
  :language,
  :latitude,
  :longitude,
  :name,
  :phone_code,
  :region_code,
  :region_name,
  :time_zone,
  :tld,
  :zip_code,
  keyword_init: true
)

# Request payload for Json#create.
#
# @!attribute [rw] asn
#   @return [String, nil]
#
# @!attribute [rw] asn_organization
#   @return [String, nil]
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] city_name
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] continent
#   @return [String, nil]
#
# @!attribute [rw] continent_code
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] country_name
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [Array, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] ip_address
#   @return [String, nil]
#
# @!attribute [rw] ip_version
#   @return [Integer, nil]
#
# @!attribute [rw] is_proxy
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone_code
#   @return [Array, nil]
#
# @!attribute [rw] region_code
#   @return [String, nil]
#
# @!attribute [rw] region_name
#   @return [String, nil]
#
# @!attribute [rw] time_zone
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [Array, nil]
#
# @!attribute [rw] zip_code
#   @return [String, nil]
JsonCreateData = Struct.new(
  :asn,
  :asn_organization,
  :capital,
  :city_name,
  :code,
  :continent,
  :continent_code,
  :country_code,
  :country_name,
  :currency,
  :ip,
  :ip_address,
  :ip_version,
  :is_proxy,
  :language,
  :latitude,
  :longitude,
  :name,
  :phone_code,
  :region_code,
  :region_name,
  :time_zone,
  :tld,
  :zip_code,
  keyword_init: true
)

