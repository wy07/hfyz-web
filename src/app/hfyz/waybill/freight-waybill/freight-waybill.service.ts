import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class FreightWaybillService {

    constructor(public restangular: Restangular) {
    }

    search(vehicleNo, ownerName, dateBegin, dateEnd, max, offset) {
        return this.restangular.all('freight-waybills').customGET('search', {
            vehicleNo: vehicleNo,
            ownerName: ownerName,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            max: max,
            offset: offset
        })
    }
}
