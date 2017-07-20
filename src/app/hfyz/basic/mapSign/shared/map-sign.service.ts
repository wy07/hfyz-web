import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class MapSignService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('map-signs').customGET('list', {max: max, offset: offset});
  }

  delete(id) {
    return this.restangular.one('map-signs', id).customDELETE('delete', {});
  }

  changeDisplay(id, display) {
    return this.restangular.one('map-signs', id).customPOST({display: display}, 'changeDisplay');
  }
}
