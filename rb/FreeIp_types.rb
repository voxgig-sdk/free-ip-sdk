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
# @!attribute [rw] asnOrganization
#   @return [String, nil]
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] cityName
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] continent
#   @return [String, nil]
#
# @!attribute [rw] continentCode
#   @return [String, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] countryName
#   @return [String, nil]
#
# @!attribute [rw] currencies
#   @return [Array, nil]
#
# @!attribute [rw] currency
#   @return [Hash, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] ipAddress
#   @return [String, nil]
#
# @!attribute [rw] ipVersion
#   @return [Integer, nil]
#
# @!attribute [rw] isProxy
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] languages
#   @return [Array, nil]
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
# @!attribute [rw] phoneCodes
#   @return [Array, nil]
#
# @!attribute [rw] regionCode
#   @return [String, nil]
#
# @!attribute [rw] regionName
#   @return [String, nil]
#
# @!attribute [rw] timeZone
#   @return [String, nil]
#
# @!attribute [rw] timeZones
#   @return [Array, nil]
#
# @!attribute [rw] tlds
#   @return [Array, nil]
#
# @!attribute [rw] zipCode
#   @return [String, nil]
Json = Struct.new(
  :asn,
  :asnOrganization,
  :capital,
  :cityName,
  :code,
  :continent,
  :continentCode,
  :countryCode,
  :countryName,
  :currencies,
  :currency,
  :ip,
  :ipAddress,
  :ipVersion,
  :isProxy,
  :language,
  :languages,
  :latitude,
  :longitude,
  :name,
  :phoneCodes,
  :regionCode,
  :regionName,
  :timeZone,
  :timeZones,
  :tlds,
  :zipCode,
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
# @!attribute [rw] asnOrganization
#   @return [String, nil]
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] cityName
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] continent
#   @return [String, nil]
#
# @!attribute [rw] continentCode
#   @return [String, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] countryName
#   @return [String, nil]
#
# @!attribute [rw] currencies
#   @return [Array, nil]
#
# @!attribute [rw] currency
#   @return [Hash, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] ipAddress
#   @return [String, nil]
#
# @!attribute [rw] ipVersion
#   @return [Integer, nil]
#
# @!attribute [rw] isProxy
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] languages
#   @return [Array, nil]
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
# @!attribute [rw] phoneCodes
#   @return [Array, nil]
#
# @!attribute [rw] regionCode
#   @return [String, nil]
#
# @!attribute [rw] regionName
#   @return [String, nil]
#
# @!attribute [rw] timeZone
#   @return [String, nil]
#
# @!attribute [rw] timeZones
#   @return [Array, nil]
#
# @!attribute [rw] tlds
#   @return [Array, nil]
#
# @!attribute [rw] zipCode
#   @return [String, nil]
JsonListMatch = Struct.new(
  :asn,
  :asnOrganization,
  :capital,
  :cityName,
  :code,
  :continent,
  :continentCode,
  :countryCode,
  :countryName,
  :currencies,
  :currency,
  :ip,
  :ipAddress,
  :ipVersion,
  :isProxy,
  :language,
  :languages,
  :latitude,
  :longitude,
  :name,
  :phoneCodes,
  :regionCode,
  :regionName,
  :timeZone,
  :timeZones,
  :tlds,
  :zipCode,
  keyword_init: true
)

# Request payload for Json#create.
#
# @!attribute [rw] asn
#   @return [String, nil]
#
# @!attribute [rw] asnOrganization
#   @return [String, nil]
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] cityName
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] continent
#   @return [String, nil]
#
# @!attribute [rw] continentCode
#   @return [String, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] countryName
#   @return [String, nil]
#
# @!attribute [rw] currencies
#   @return [Array, nil]
#
# @!attribute [rw] currency
#   @return [Hash, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] ipAddress
#   @return [String, nil]
#
# @!attribute [rw] ipVersion
#   @return [Integer, nil]
#
# @!attribute [rw] isProxy
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] languages
#   @return [Array, nil]
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
# @!attribute [rw] phoneCodes
#   @return [Array, nil]
#
# @!attribute [rw] regionCode
#   @return [String, nil]
#
# @!attribute [rw] regionName
#   @return [String, nil]
#
# @!attribute [rw] timeZone
#   @return [String, nil]
#
# @!attribute [rw] timeZones
#   @return [Array, nil]
#
# @!attribute [rw] tlds
#   @return [Array, nil]
#
# @!attribute [rw] zipCode
#   @return [String, nil]
JsonCreateData = Struct.new(
  :asn,
  :asnOrganization,
  :capital,
  :cityName,
  :code,
  :continent,
  :continentCode,
  :countryCode,
  :countryName,
  :currencies,
  :currency,
  :ip,
  :ipAddress,
  :ipVersion,
  :isProxy,
  :language,
  :languages,
  :latitude,
  :longitude,
  :name,
  :phoneCodes,
  :regionCode,
  :regionName,
  :timeZone,
  :timeZones,
  :tlds,
  :zipCode,
  keyword_init: true
)

