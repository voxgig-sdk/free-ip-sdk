import { IpGeolocationEntity } from './entity/IpGeolocationEntity';
import { JsonEntity } from './entity/JsonEntity';
export type * from './FreeIpTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FreeIpEntityBase } from './FreeIpEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class FreeIpSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    IpGeolocation(entopts?: Record<string, any>): IpGeolocationEntity;
    Json(entopts?: Record<string, any>): JsonEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FreeIpSDK;
    tester(testopts?: any, sdkopts?: any): FreeIpSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FreeIpSDK;
export { stdutil, config, BaseFeature, FreeIpEntityBase, FreeIpSDK, SDK, };
