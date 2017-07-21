import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class RoleService {
  constructor(public restangular: Restangular) {
  }

  list(operatorId) {
    return this.restangular.all('roles').customGET('list', {operatorId: operatorId});
  }
  delete(id) {
    return this.restangular.one('roles', id).customDELETE('delete', {});
  }
  edit(id, roles) {
    return this.restangular.one('roles', id).customGET('edit', {roles: roles});
  }

  save(formData) {
    return this.restangular.all('roles').customPOST(formData, 'save');
  }
  update(id, formData) {
    return this.restangular.one('roles',id).customPOST(formData, 'update');
  }
  getPermission(roles){
    return this.restangular.all('permission-groups').customGET('list', {roles: roles});
  }

  savePermission(id,permissions){
    return this.restangular.one('permission-groups', id).customPOST(permissions, 'save');
  }
  listForSelect(roles,operatorId){
     return this.restangular.all('roles').customGET('list-for-select', {roles: roles, operatorId: operatorId});
  }
  orgListForSelect(roles){
    return this.restangular.all('organizations').customGET('list-for-select', {roles: roles});
  }
}
