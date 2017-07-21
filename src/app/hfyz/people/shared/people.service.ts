import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class PeopleService {

  constructor(public restangular: Restangular) {
  }

  search(name, phoneNo, IDCardNo, max, offset) {
    return this.restangular.all('people-basic-infos').customGET('list', {
      name: name,
      phoneNo: phoneNo,
      IDCardNo: IDCardNo,
      max: max,
      offset: offset
    });
  }

  moreInfo(IDCardNo) {
    return this.restangular.one('people-basic-infos').customGET('more', {IDCardNo: IDCardNo});
  }
}
