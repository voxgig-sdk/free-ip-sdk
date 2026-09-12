import { FreeIpEntityBase } from '../FreeIpEntityBase';
import type { FreeIpSDK } from '../FreeIpSDK';
import type { Control } from '../types';
import type { IpGeolocation, IpGeolocationLoadMatch } from '../FreeIpTypes';
declare class IpGeolocationEntity extends FreeIpEntityBase<IpGeolocation> {
    constructor(client: FreeIpSDK, entopts: any);
    make(this: IpGeolocationEntity): IpGeolocationEntity;
    load(this: any, reqmatch?: IpGeolocationLoadMatch, ctrl?: Control): Promise<IpGeolocationEntity>;
}
export { IpGeolocationEntity };
