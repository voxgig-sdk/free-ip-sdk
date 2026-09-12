import { FreeIpEntityBase } from '../FreeIpEntityBase';
import type { FreeIpSDK } from '../FreeIpSDK';
import type { Control } from '../types';
import type { Json, JsonLoadMatch, JsonListMatch, JsonCreateData } from '../FreeIpTypes';
declare class JsonEntity extends FreeIpEntityBase<Json> {
    constructor(client: FreeIpSDK, entopts: any);
    make(this: JsonEntity): JsonEntity;
    load(this: any, reqmatch?: JsonLoadMatch, ctrl?: Control): Promise<JsonEntity>;
    list(this: any, reqmatch?: JsonListMatch, ctrl?: Control): Promise<JsonEntity[]>;
    create(this: any, reqdata?: JsonCreateData, ctrl?: Control): Promise<JsonEntity>;
}
export { JsonEntity };
