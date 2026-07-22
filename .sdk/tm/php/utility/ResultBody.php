<?php
declare(strict_types=1);

// FreeIp SDK utility: result_body

class FreeIpResultBody
{
    public static function call(FreeIpContext $ctx): ?FreeIpResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
