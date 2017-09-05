import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class EmergencyPlanService {

  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('emergency-plans').customGET('list', {max: max, offset: offset});
  }

  dangerousTypeList() {
    return this.restangular.all('system-codes').customGET('get-dangerous-type-list');
  }

  // save(freightRouter) {
  //     return this.restangular.one('freight-routers').customPOST(freightRouter, 'save');
  // }

  // delete(id) {
  //   return this.restangular.one('freight-routers', id).customDELETE('delete', {});
  // }
  //
  // show(id) {
  //   return this.restangular.one('freight-routers', id).customGET('show');
  // }
  //
  // edit(id) {
  //   return this.restangular.one('freight-routers', id).customGET('edit');
  // }
  //
  // update(freightRouter) {
  //   return this.restangular.one('freight-routers', freightRouter.id).customPOST(freightRouter, 'update');
  // }

}
