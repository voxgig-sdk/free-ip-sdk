# FreeIp SDK utility: make_context
require_relative '../core/context'
module FreeIpUtilities
  MakeContext = ->(ctxmap, basectx) {
    FreeIpContext.new(ctxmap, basectx)
  }
end
