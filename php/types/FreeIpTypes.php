<?php
declare(strict_types=1);

// Typed models for the FreeIp SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** IpGeolocation entity data model. */
class IpGeolocation
{
}

/** Request payload for IpGeolocation#load. */
class IpGeolocationLoadMatch
{
    public ?string $ip_address = null;
}

/** Json entity data model. */
class Json
{
    public ?string $asn = null;
    public ?string $asn_organization = null;
    public ?string $capital = null;
    public ?string $city_name = null;
    public ?string $code = null;
    public ?string $continent = null;
    public ?string $continent_code = null;
    public ?string $country_code = null;
    public ?string $country_name = null;
    public ?array $currency = null;
    public ?string $ip = null;
    public ?string $ip_address = null;
    public ?int $ip_version = null;
    public ?bool $is_proxy = null;
    public ?string $language = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?array $phone_code = null;
    public ?string $region_code = null;
    public ?string $region_name = null;
    public ?string $time_zone = null;
    public ?array $tld = null;
    public ?string $zip_code = null;
}

/** Request payload for Json#load. */
class JsonLoadMatch
{
    public string $id;
}

/** Request payload for Json#list. */
class JsonListMatch
{
    public ?string $asn = null;
    public ?string $asn_organization = null;
    public ?string $capital = null;
    public ?string $city_name = null;
    public ?string $code = null;
    public ?string $continent = null;
    public ?string $continent_code = null;
    public ?string $country_code = null;
    public ?string $country_name = null;
    public ?array $currency = null;
    public ?string $ip = null;
    public ?string $ip_address = null;
    public ?int $ip_version = null;
    public ?bool $is_proxy = null;
    public ?string $language = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?array $phone_code = null;
    public ?string $region_code = null;
    public ?string $region_name = null;
    public ?string $time_zone = null;
    public ?array $tld = null;
    public ?string $zip_code = null;
}

/** Request payload for Json#create. */
class JsonCreateData
{
    public ?string $asn = null;
    public ?string $asn_organization = null;
    public ?string $capital = null;
    public ?string $city_name = null;
    public ?string $code = null;
    public ?string $continent = null;
    public ?string $continent_code = null;
    public ?string $country_code = null;
    public ?string $country_name = null;
    public ?array $currency = null;
    public ?string $ip = null;
    public ?string $ip_address = null;
    public ?int $ip_version = null;
    public ?bool $is_proxy = null;
    public ?string $language = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?array $phone_code = null;
    public ?string $region_code = null;
    public ?string $region_name = null;
    public ?string $time_zone = null;
    public ?array $tld = null;
    public ?string $zip_code = null;
}

