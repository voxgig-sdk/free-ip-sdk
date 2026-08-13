# Typed models for the FreeIp SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class IpGeolocation(TypedDict):
    pass


class IpGeolocationLoadMatch(TypedDict, total=False):
    ip_address: str


class Json(TypedDict, total=False):
    asn: str
    asnOrganization: str
    capital: str
    cityName: str
    code: str
    continent: str
    continentCode: str
    countryCode: str
    countryName: str
    currencies: list
    currency: dict
    ip: str
    ipAddress: str
    ipVersion: int
    isProxy: bool
    language: str
    languages: list
    latitude: float
    longitude: float
    name: str
    phoneCodes: list
    regionCode: str
    regionName: str
    timeZone: str
    timeZones: list
    tlds: list
    zipCode: str


class JsonLoadMatch(TypedDict):
    id: str


class JsonListMatch(TypedDict, total=False):
    asn: str
    asnOrganization: str
    capital: str
    cityName: str
    code: str
    continent: str
    continentCode: str
    countryCode: str
    countryName: str
    currencies: list
    currency: dict
    ip: str
    ipAddress: str
    ipVersion: int
    isProxy: bool
    language: str
    languages: list
    latitude: float
    longitude: float
    name: str
    phoneCodes: list
    regionCode: str
    regionName: str
    timeZone: str
    timeZones: list
    tlds: list
    zipCode: str


class JsonCreateData(TypedDict, total=False):
    asn: str
    asnOrganization: str
    capital: str
    cityName: str
    code: str
    continent: str
    continentCode: str
    countryCode: str
    countryName: str
    currencies: list
    currency: dict
    ip: str
    ipAddress: str
    ipVersion: int
    isProxy: bool
    language: str
    languages: list
    latitude: float
    longitude: float
    name: str
    phoneCodes: list
    regionCode: str
    regionName: str
    timeZone: str
    timeZones: list
    tlds: list
    zipCode: str
