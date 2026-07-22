<?php
declare(strict_types=1);

// FreeIp SDK exists test

require_once __DIR__ . '/../freeip_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FreeIpSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
