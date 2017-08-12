import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class PassLinePhysicalBasicService {

  constructor(public restangular: Restangular) {
  }

 search(lineCode, lineName, max, offset) {
        return this.restangular.all('pass-line-physical-basic-infos').customGET('search', {
            lineCode: lineCode,
            lineName: lineName,
            max: max,
            offset: offset
        })
    }
}
