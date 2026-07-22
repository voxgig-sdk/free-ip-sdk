<?php
declare(strict_types=1);

// FreeIp SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FreeIpMakeContext
{
    public static function call(array $ctxmap, ?FreeIpContext $basectx): FreeIpContext
    {
        return new FreeIpContext($ctxmap, $basectx);
    }
}
