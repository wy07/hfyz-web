import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class HiddenRectificationOrderService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset, company, sd, ed) {
    return this.restangular.all('hidden-rectification-orders').customGET('list',
      {max: max, offset: offset, company: company, startDate: sd, endDate: ed });
  }

  delete(id) {
    return this.restangular.one('hidden-rectification-orders', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('hidden-rectification-orders', id).customGET('edit');
  }

  save(hiddenRectificationOrder) {
    return this.restangular.all('hidden-rectification-orders').customPOST(hiddenRectificationOrder, 'save');
  }

  update(id, hiddenRectificationOrder) {
    return this.restangular.one('hidden-rectification-orders', id).customPOST(hiddenRectificationOrder, 'update');
  }

}
