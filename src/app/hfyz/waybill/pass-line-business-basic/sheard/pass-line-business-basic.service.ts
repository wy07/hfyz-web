import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class PassLineBusinessBasicService {

  constructor(public restangular: Restangular) {
  }

 search(ownerName, max, offset) {
        return this.restangular.all('pass-line-business-basic-infos').customGET('search', {
            ownerName: ownerName,
            max: max,
            offset: offset
        })
    }
}
