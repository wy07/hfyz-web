import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class CarService {


    constructor(public restangular: Restangular) {
    }


    search(dateBegin, dateEnd, businessType, licenseNo, max, offset) {
        return this.restangular.all('cars').customGET('search', {
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            businessType: businessType,
            licenseNo: licenseNo,
            max: max,
            offset: offset
        });
    }

    getCompanyCars(companyCode) {
        return this.restangular.one('companys', companyCode).customGET('cars')
    }

    detail(id) {
        return this.restangular.one('cars', id).customGET('detail');
    }

    getWarning(id, max, offset) {
        return this.restangular.one('cars', id).customGET('get-warning', {max: max, offset: offset});
    }

    getHistory(id) {
        return this.restangular.one('cars', id).customGET('get-history');
    }
}
