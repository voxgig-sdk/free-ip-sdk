<?php
declare(strict_types=1);

// FreeIp SDK base feature

class FreeIpBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FreeIpContext $ctx, array $options): void {}
    public function PostConstruct(FreeIpContext $ctx): void {}
    public function PostConstructEntity(FreeIpContext $ctx): void {}
    public function SetData(FreeIpContext $ctx): void {}
    public function GetData(FreeIpContext $ctx): void {}
    public function GetMatch(FreeIpContext $ctx): void {}
    public function SetMatch(FreeIpContext $ctx): void {}
    public function PrePoint(FreeIpContext $ctx): void {}
    public function PreSpec(FreeIpContext $ctx): void {}
    public function PreRequest(FreeIpContext $ctx): void {}
    public function PreResponse(FreeIpContext $ctx): void {}
    public function PreResult(FreeIpContext $ctx): void {}
    public function PreDone(FreeIpContext $ctx): void {}
    public function PreUnexpected(FreeIpContext $ctx): void {}
}
