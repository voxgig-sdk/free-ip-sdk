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
    asn_organization: str
    capital: str
    city_name: str
    code: str
    continent: str
    continent_code: str
    country_code: str
    country_name: str
    currency: list
    ip: str
    ip_address: str
    ip_version: int
    is_proxy: bool
    language: str
    latitude: float
    longitude: float
    name: str
    phone_code: list
    region_code: str
    region_name: str
    time_zone: str
    tld: list
    zip_code: str


class JsonLoadMatch(TypedDict):
    id: str


class JsonListMatch(TypedDict, total=False):
    asn: str
    asn_organization: str
    capital: str
    city_name: str
    code: str
    continent: str
    continent_code: str
    country_code: str
    country_name: str
    currency: list
    ip: str
    ip_address: str
    ip_version: int
    is_proxy: bool
    language: str
    latitude: float
    longitude: float
    name: str
    phone_code: list
    region_code: str
    region_name: str
    time_zone: str
    tld: list
    zip_code: str


class JsonCreateData(TypedDict, total=False):
    asn: str
    asn_organization: str
    capital: str
    city_name: str
    code: str
    continent: str
    continent_code: str
    country_code: str
    country_name: str
    currency: list
    ip: str
    ip_address: str
    ip_version: int
    is_proxy: bool
    language: str
    latitude: float
    longitude: float
    name: str
    phone_code: list
    region_code: str
    region_name: str
    time_zone: str
    tld: list
    zip_code: str
