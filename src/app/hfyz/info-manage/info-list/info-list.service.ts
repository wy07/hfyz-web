import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class InfoListService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('infoaudits').customGET('list', {
      max: max,
      offset: offset
    });
  }

  select(type, max, offset) {
    return this.restangular.one('infoaudits').customGET('select', {
      type: type,
      max: max,
      offset: offset
    });
  }

  edit(id) {
    return this.restangular.one('infoaudits', id).customGET('edit');
  }

}
