# FreeIp SDK utility: prepare_body
require_relative 'media'
module FreeIpUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FreeIpUtilities.raw_body(ctx.reqdata) if FreeIpUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
