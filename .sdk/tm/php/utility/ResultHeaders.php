<?php
declare(strict_types=1);

// FreeIp SDK utility: result_headers

class FreeIpResultHeaders
{
    public static function call(FreeIpContext $ctx): ?FreeIpResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
