import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
@Injectable()
export class UserService {
    constructor(public restangular: Restangular) {
    }

    list(max, offset) {
        return this.restangular.all('sysusers').customGET('', {max: max, offset: offset});
    }

    delete(id) {
        return this.restangular.one('sysusers', id).customDELETE('', {});
    }

    edit(id) {
        return this.restangular.one('sysusers', id).customGET('edit');
    }

    save(formData) {
        return this.restangular.all('sysusers').post(formData);
    }

    update(id, formData) {
        return this.restangular.one('sysusers', id).customPOST(formData);
    }

    resetPassword(id) {
        return this.restangular.one('sysusers', id).customPOST({}, 'reset-password');
    }


}
