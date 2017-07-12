import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class PlatformManageService {
  constructor(public restangular: Restangular) {
  }

  list() {
    return this.restangular.all('platformManage').customGET('list');
  }


}
