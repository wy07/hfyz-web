import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class StatisticService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset, company, startDate, endDate) {
    return this.restangular.all('check-statistics').customGET('list',
      {max: max, offset: offset, company: company, startDate: startDate, endDate: endDate});
  }
}
