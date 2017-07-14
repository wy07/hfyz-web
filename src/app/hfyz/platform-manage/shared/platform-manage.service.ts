import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class PlatformManageService {
  constructor(public restangular: Restangular) {
  }

  list() {
    return this.restangular.all('platform-manages').customGET('list');
  }

  search(name, code) {
    // alert(name + code);
    return this.restangular.all('platform-manages').customGET('search', {name: name, code: code});
  }

  delete(id) {
    return this.restangular.one('platform-manages', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('platform-manages', id).customGET('edit');
  }

  save(platform) {
    return this.restangular.all('platform-manages').customPOST(platform, 'save');
  }

  update(id, formData) {
    // console.log(`update:${id}`)
    // console.log(`formData:${JSON.stringify(formData)}`)
    return this.restangular.one('platform-manages', id).customPOST(formData, 'update');
  }

}
