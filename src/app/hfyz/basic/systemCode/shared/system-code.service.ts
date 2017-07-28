import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class SystemCodeService {


  constructor(public restangular: Restangular) {
  }

  index() {
    return this.restangular.all('system-codes').customGET('index', {});
  }

  list(parentId, type) {
    return this.restangular.all('system-codes').customGET('list', {parentId: parentId, type: type});
  }

  delete(id, type) {
    return this.restangular.one('system-codes', id).customDELETE('delete', {type: type});
  }

  edit(id, type) {
    return this.restangular.one('system-codes', id).customGET('edit', {type: type});
  }

  search(query, type) {
    return this.restangular.all('system-codes').customGET('search', {
      query: query
      , type: type
    });
  }

  save(formData, type) {
    return this.restangular.all('system-codes').customPOST(formData, 'save', {type: type});
  }

  update(id, formData, type) {
    return this.restangular.one('system-codes', id).customPOST(formData, 'update', {type: type});
  }
}
