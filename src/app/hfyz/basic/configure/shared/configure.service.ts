import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class ConfigureService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('configures').customGET('list', {max: max, offset: offset});
  }
  edit(id) {
    return this.restangular.one('configures', id).customGET('edit');
  }
  update(id, configureData) {
    return this.restangular.one('configures', id).customPOST(configureData, 'update');
  }
}
