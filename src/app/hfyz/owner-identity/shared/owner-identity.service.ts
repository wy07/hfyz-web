import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

/**
 * Created by wangyan on 2017/7/27.
 */
@Injectable()
export class OwnerIdentityService {
    constructor(public restangular: Restangular) {
    }

    list(dateBegin, dateEnd, max, offset, ownerName, companyCode) {
        return this.restangular.all('owner-identitys').customGET('list', {
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            max: max,
            offset: offset,
            ownerName: ownerName,
            companyCode: companyCode
        });
    }

    view(id) {
        return this.restangular.one('owner-identitys', id).customGET('view');
    }

    all() {
        return this.restangular.all('owner-identitys').customGET('all');
    }
}
