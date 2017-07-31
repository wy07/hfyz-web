import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class HiddenDangerService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('hidden-dangers').customGET('list', {max: max, offset: offset});
  }

  delete(id) {
    return this.restangular.one('hidden-dangers', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('hidden-dangers', id).customGET('edit');
  }

  save(platform) {
    return this.restangular.all('hidden-dangers').customPOST(platform, 'save');
  }

  update(id, Data) {
    return this.restangular.one('hidden-dangers', id).customPOST(Data, 'update');
  }

}
