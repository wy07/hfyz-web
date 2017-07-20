import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class WarningService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset, frameNo, carLicenseNo) {
    return this.restangular.all('warnings').customGET('list', {
      max: max,
      offset: offset,
      frameNo: frameNo,
      carLicenseNo: carLicenseNo,
    });
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
