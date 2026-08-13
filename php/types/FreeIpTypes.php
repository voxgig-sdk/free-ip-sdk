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
    public ?string $asnOrganization = null;
    public ?string $capital = null;
    public ?string $cityName = null;
    public ?string $code = null;
    public ?string $continent = null;
    public ?string $continentCode = null;
    public ?string $countryCode = null;
    public ?string $countryName = null;
    public ?array $currencies = null;
    public ?array $currency = null;
    public ?string $ip = null;
    public ?string $ipAddress = null;
    public ?int $ipVersion = null;
    public ?bool $isProxy = null;
    public ?string $language = null;
    public ?array $languages = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?array $phoneCodes = null;
    public ?string $regionCode = null;
    public ?string $regionName = null;
    public ?string $timeZone = null;
    public ?array $timeZones = null;
    public ?array $tlds = null;
    public ?string $zipCode = null;
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
    public ?string $asnOrganization = null;
    public ?string $capital = null;
    public ?string $cityName = null;
    public ?string $code = null;
    public ?string $continent = null;
    public ?string $continentCode = null;
    public ?string $countryCode = null;
    public ?string $countryName = null;
    public ?array $currencies = null;
    public ?array $currency = null;
    public ?string $ip = null;
    public ?string $ipAddress = null;
    public ?int $ipVersion = null;
    public ?bool $isProxy = null;
    public ?string $language = null;
    public ?array $languages = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?array $phoneCodes = null;
    public ?string $regionCode = null;
    public ?string $regionName = null;
    public ?string $timeZone = null;
    public ?array $timeZones = null;
    public ?array $tlds = null;
    public ?string $zipCode = null;
}

/** Request payload for Json#create. */
class JsonCreateData
{
    public ?string $asn = null;
    public ?string $asnOrganization = null;
    public ?string $capital = null;
    public ?string $cityName = null;
    public ?string $code = null;
    public ?string $continent = null;
    public ?string $continentCode = null;
    public ?string $countryCode = null;
    public ?string $countryName = null;
    public ?array $currencies = null;
    public ?array $currency = null;
    public ?string $ip = null;
    public ?string $ipAddress = null;
    public ?int $ipVersion = null;
    public ?bool $isProxy = null;
    public ?string $language = null;
    public ?array $languages = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?array $phoneCodes = null;
    public ?string $regionCode = null;
    public ?string $regionName = null;
    public ?string $timeZone = null;
    public ?array $timeZones = null;
    public ?array $tlds = null;
    public ?string $zipCode = null;
}

