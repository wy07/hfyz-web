import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class WhiteListService {

  constructor(public restangular: Restangular) {
  }

  search(vehicleNo, max, offset) {
    return this.restangular.all('white-lists').customGET('list', {
      vehicleNo: vehicleNo,
      max: max,
      offset: offset
    })
  }

  delete(id) {
    return this.restangular.one('white-lists', id).customDELETE('delete', {})
  }

  more(id) {
    return this.restangular.one('white-lists', id).customGET('more', {})
  }

  get(id) {
    return this.restangular.one('white-lists', id).customGET('get', {})
  }

  update(id, whiteList) {
    return this.restangular.one('white-lists', id).customPOST(whiteList, 'update')
  }

  save(whiteList) {
    return this.restangular.one('white-lists').customPOST(whiteList, 'save')
  }
}
