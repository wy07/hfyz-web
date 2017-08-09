import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class WaybillRouteService {

  constructor(public restangular: Restangular) {
  }

  getFreightRouterList(max, offset) {
    return this.restangular.all('freight-routers').customGET('list', {max: max, offset: offset});
  }

  save(freightRouter) {
      return this.restangular.one('freight-routers').customPOST(freightRouter, 'save');
  }

  delete(id) {
    return this.restangular.one('freight-routers', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('freight-routers', id).customGET('edit');
  }

  update(freightRouter) {
    return this.restangular.one('freight-routers', freightRouter.id).customPOST(freightRouter, 'update');
  }

}
