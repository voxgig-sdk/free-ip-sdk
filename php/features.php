<?php
declare(strict_types=1);

// FreeIp SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FreeIpFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FreeIpBaseFeature();
            case "test":
                return new FreeIpTestFeature();
            default:
                return new FreeIpBaseFeature();
        }
    }
}
