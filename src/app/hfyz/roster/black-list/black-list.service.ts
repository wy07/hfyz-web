import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class BlackListService {

  constructor(public restangular: Restangular) {
  }

  search(vehicleNo, controlBegin, controlEnd, max, offset) {
    return this.restangular.all('black-lists').customGET('list', {
      vehicleNo: vehicleNo,
      dateBegin: controlBegin,
      dateEnd: controlEnd,
      max: max,
      offset: offset
    })
  }

  delete(id) {
    return this.restangular.one('black-lists', id).customDELETE('delete', {})
  }

  more(id) {
    return this.restangular.one('black-lists', id).customGET('show', {})
  }

  get(id) {
    return this.restangular.one('black-lists', id).customGET('edit', {})
  }

  update(id, blackList) {
    return this.restangular.one('black-lists', id).customPOST(blackList, 'update')
  }

  save(blackList) {
    return this.restangular.one('black-lists').customPOST(blackList, 'save')
  }
}
