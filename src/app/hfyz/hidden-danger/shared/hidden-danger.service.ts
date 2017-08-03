import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class HiddenDangerService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset, company, sd, ed) {
    return this.restangular.all('hidden-dangers').customGET('find-list-and-total',
      {max: max, offset: offset, company: company, startDate: sd, endDate: ed });
  }

  delete(id) {
    return this.restangular.one('hidden-dangers', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('hidden-dangers', id).customGET('edit');
  }

  save(hiddenDanger) {
    return this.restangular.all('hidden-dangers').customPOST(hiddenDanger, 'save');
  }

  update(id, hiddenDanger) {
    return this.restangular.one('hidden-dangers', id).customPOST(hiddenDanger, 'update');
  }

}
