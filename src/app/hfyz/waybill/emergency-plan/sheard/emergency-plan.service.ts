import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class EmergencyPlanService {

  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('emergency-plans').customGET('list', {max: max, offset: offset});
  }

  dangerousTypeList() {
    return this.restangular.all('system-codes').customGET('get-dangerous-type-list');
  }

  save(emergencyPlan) {
      return this.restangular.one('emergency-plans').customPOST(emergencyPlan, 'save');
  }

  delete(id) {
    return this.restangular.one('emergency-plans', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('emergency-plans', id).customGET('edit');
  }

  update(emergencyPlan) {
    return this.restangular.one('emergency-plans', emergencyPlan.id).customPOST(emergencyPlan, 'update');
  }

}
