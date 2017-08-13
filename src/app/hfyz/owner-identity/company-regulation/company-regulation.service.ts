import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class CompanyRegulationService {

    constructor(public restangular: Restangular) {
    }

    search(ownerName, dateBegin, dateEnd, max, offset) {
        return this.restangular.all('company-regulations').customGET('search', {
            ownerName: ownerName,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            max: max,
            offset: offset
        });
    }
}
