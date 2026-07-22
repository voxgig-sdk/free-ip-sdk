<?php
declare(strict_types=1);

// FreeIp SDK utility: prepare_body

class FreeIpPrepareBody
{
    public static function call(FreeIpContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
