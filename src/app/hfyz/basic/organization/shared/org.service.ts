import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class OrganizationService {
  constructor(public restangular: Restangular) {
  }

  list() {
    return this.restangular.all('organizations').customGET('list');
  }

  delete(id) {
    return this.restangular.one('organizations', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('organizations', id).customGET('edit');
  }

  save(formData) {
    return this.restangular.all('organizations').customPOST(formData, 'save');
  }

  update(id, formData) {
    return this.restangular.one('organizations',id).customPOST(formData, 'update');
  }
}
