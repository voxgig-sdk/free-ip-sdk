-- FreeIp SDK error

local FreeIpError = {}
FreeIpError.__index = FreeIpError


function FreeIpError.new(code, msg, ctx)
  local self = setmetatable({}, FreeIpError)
  self.is_sdk_error = true
  self.sdk = "FreeIp"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FreeIpError:error()
  return self.msg
end


function FreeIpError:__tostring()
  return self.msg
end


return FreeIpError
