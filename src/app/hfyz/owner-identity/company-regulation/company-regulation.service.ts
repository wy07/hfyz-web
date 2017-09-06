import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class CompanyRegulationService {

    MAXFILESIZE: number;
    constructor(public restangular: Restangular) {
        this.MAXFILESIZE = 5242880;
    }

    search(ownerName, dateBegin, dateEnd, systemTypeId, max, offset) {
        return this.restangular.all('company-regulations').customGET('search', {
            ownerName: ownerName,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            systemTypeId: systemTypeId,
            max: max,
            offset: offset
        });
    }

    getSystemTypeList() {
        return this.restangular.one('company-regulations').customGET('get-system-type-list');
    }

    save(formData) {
        return this.restangular.all('company-regulations').customPOST(formData, 'save', {}, { 'Content-Type': undefined });
    }

    edit(id) {
        return this.restangular.one('company-regulations', id).customGET('edit');
    }

    update(id, regulation) {
        return this.restangular.one('company-regulations', id).customPOST(regulation, 'update');
    }

    delete(id) {
        return this.restangular.one('company-regulations', id).customDELETE('delete', {});
    }
}
