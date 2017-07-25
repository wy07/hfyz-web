import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
@Injectable()
export class UserService {
  constructor(public restangular: Restangular) {
  }

  list(operatorId) {
    return this.restangular.all('sysusers').customGET('list',{operatorId: operatorId});
  }
  delete(id) {
    return this.restangular.one('sysusers', id).customDELETE('delete', {});
  }
  edit(id) {
    return this.restangular.one('sysusers', id).customGET('edit');
  }

  save(formData) {
    return this.restangular.all('sysusers').customPOST(formData, 'save');
  }

  update(id, formData) {
    return this.restangular.one('sysusers', id).customPOST(formData, 'update');
  }

  resetPassword(id) {
    return this.restangular.one('sysusers', id).customPOST({}, 'reset-password');
  }


}
