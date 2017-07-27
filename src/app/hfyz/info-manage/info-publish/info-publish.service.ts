import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class InfoPublishService {
  constructor(public restangular: Restangular) {
  }

/*
  list(parentId) {

    return this.restangular.all('infoaudits').customGET('list', {parentId: parentId});
  }
*/

  list(max, offset) {
    return this.restangular.all('infoaudits').customGET('list', {
      max: max,
      offset: offset,
    });
  }

  save(formData) {
    return this.restangular.all('infoaudits').customPOST(formData, 'save');
  }

  delete(id) {
    return this.restangular.one('infoaudits', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('infoaudits', id).customGET('edit');
  }

  update(id, formData) {
    return this.restangular.one('infoaudits', id).customPOST(formData, 'update');
  }

  search(textTitle, dateBegin, dateEnd, max, offset) {
    return this.restangular.all('infoaudits').customGET('search', {
      textTitle: textTitle
      , dateBegin: dateBegin
      , dateEnd: dateEnd
      , max: max
      , offset: offset
    });
  }
}
