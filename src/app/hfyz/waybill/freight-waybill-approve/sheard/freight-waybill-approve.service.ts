import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class FreightWaybillApproveService {
    area: any;
    constructor(public restangular: Restangular) {
    }

    approveOpinion(freightWaybillId, type) {
        return this.restangular.one('freight-waybill-approve-opinions').customPOST({fid: freightWaybillId, type: type}, 'approve-opinion');
    }
}
