import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class RoleService {
    constructor(public restangular: Restangular) {
    }

    list(max, offset) {
        return this.restangular.all('roles').customGET('',{max: max, offset: offset});
    }

    delete(id) {
        return this.restangular.one('roles', id).customDELETE('', {});
    }

    edit(id, roles) {
        return this.restangular.one('roles', id).customGET('edit', {roles: roles});
    }

    save(formData) {
        return this.restangular.all('roles').post(formData);
    }

    update(id, formData) {
        return this.restangular.one('roles', id).customPOST(formData);
    }

    preAssignPerm(id){
        return this.restangular.one('roles', id).customGET('pre-assign-perm');
    }

    getPermission(roles) {
        return this.restangular.all('permission-groups').customGET('list', {roles: roles});
    }

    savePermission(id, permissions) {
        return this.restangular.one('roles', id).all('assign-perm').post({perms: permissions});
    }

    listForSelect(roles, operatorId) {
        return this.restangular.all('roles').customGET('list-for-select', {roles: roles, operatorId: operatorId});
    }

    orgListForSelect(roles) {
        return this.restangular.all('organizations').customGET('list-for-select', {roles: roles});
    }
}
