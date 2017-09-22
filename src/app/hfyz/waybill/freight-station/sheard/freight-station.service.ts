import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class FreightStationService {

  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('freight-stations').customGET('list', {max: max, offset: offset});
  }

  relatedList() {
    return this.restangular.all('system-codes').customGET('get-related-list');
  }

  save(formData) {
      return this.restangular.all('freight-stations').customPOST(formData, 'save', {}, { 'Content-Type': undefined });
  }

  delete(id) {
    return this.restangular.one('freight-stations', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('freight-stations', id).customGET('edit');
  }

  update(formData, id) {
    return this.restangular.one('freight-stations', id).customPOST(formData, 'update', {}, { 'Content-Type': undefined });
  }

}
