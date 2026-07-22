
import { Context } from './Context'


class FreeIpError extends Error {

  isFreeIpError = true

  sdk = 'FreeIp'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FreeIpError
}

