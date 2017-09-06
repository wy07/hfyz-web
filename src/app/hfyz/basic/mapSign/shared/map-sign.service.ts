import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class MapSignService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('map-signs').customGET('', { max: max, offset: offset });
  }

  delete(id) {
    return this.restangular.one('map-signs', id).customDELETE('', {});
  }

  changeDisplay(id, display) {
    return this.restangular.one('map-signs', id).customPOST({ display: display }, 'change-display');
  }

  mapSignTypeList() {
    return this.restangular.all('map-signs').customGET('type-list');
  }

  edit(id) {
    return this.restangular.one('map-signs', id).customGET('edit');
  }

  save(formData) {
    return this.restangular.all('map-signs').post(formData);
  }

  update(id, formData) {
    return this.restangular.one('map-signs', id).customPOST(formData);
  }
}
