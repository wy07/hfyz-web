import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class WarningService {
  constructor(public restangular: Restangular) {
  }

  list() {
    return this.restangular.all('warnings').customGET('list');
  }
  search(frameNo, carLicenseNo) {
    return this.restangular.all('warnings').customGET('search', {
      frameNo: frameNo,
      carLicenseNo: carLicenseNo,
    });
  }
  view(id) {
    return this.restangular.one('warnings', id).customGET('view');
  }


}
