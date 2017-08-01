import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';


@Injectable()
export class PlatFormService {

  constructor(public restangular: Restangular) {
  }

  list(max, offset, company, sd, ed) {
    return this.restangular.all('owner-check-records').customGET('list',
      { max: max, offset: offset, company: company, startDate: sd, endDate: ed });
  }

  inspect(id, answer) {
    return this.restangular.one('owner-check-records', id).customPOST({ answer: answer }, 'inspect')
  }
}
