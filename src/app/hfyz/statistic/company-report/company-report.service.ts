import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class CompanyReportService {

    constructor(public restangular: Restangular) {
    }

    list() {
        return this.restangular.all('company-reports').customGET('list', {});
    }
}
