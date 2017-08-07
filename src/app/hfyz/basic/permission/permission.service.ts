import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class PermissionService {
    constructor(public restangular: Restangular) {
    }

    list(max, offset) {
        return this.restangular.all('permission-groups').customGET('',{max: max, offset: offset});
    }

    delete(id) {
        return this.restangular.one('permission-groups', id).customDELETE('', {});
    }

    edit(id) {
        return this.restangular.one('permission-groups', id).customGET('edit');
    }

    save(formData) {
        return this.restangular.all('permission-groups').post(formData);
    }

    update(id, formData) {
        return this.restangular.one('permission-groups', id).customPOST(formData);
    }
}
