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
}
