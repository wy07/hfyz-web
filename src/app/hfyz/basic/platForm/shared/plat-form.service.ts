import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';


@Injectable()
export class PlatFormService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('ownerCheckRecords').customGET('list',
        {max: max, offset: offset});
  }
  // search(position,query) {
  //   return this.restangular.all('menus').customGET('search', {
  //     query: query,
  //     position:position
  //   });
  // }
}
