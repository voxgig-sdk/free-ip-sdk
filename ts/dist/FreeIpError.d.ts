import { Context } from './Context';
declare class FreeIpError extends Error {
    isFreeIpError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { FreeIpError };
