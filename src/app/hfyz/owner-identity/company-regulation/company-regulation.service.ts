import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class CompanyRegulationService {

    MAXFILESIZE : number;
    constructor(public restangular: Restangular) {
        this.MAXFILESIZE = 5242880;
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

    save(formData) {
        return this.restangular.all('company-regulations').customPOST(formData, 'save', {} , { 'Content-Type': undefined });
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
