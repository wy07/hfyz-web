import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class MenuService {
  constructor(public restangular: Restangular) {
  }

  list(parentId) {
    return this.restangular.all('menus').customGET('list',{parentId:parentId});
  }

  delete(id) {
    return this.restangular.one('menus', id).customDELETE('delete', {});
  }

  edit(id) {
    return this.restangular.one('menus', id).customGET('edit');
  }

  save(formData) {
    return this.restangular.all('menus').customPOST(formData, 'save');
  }

  update(id, formData) {
    return this.restangular.one('menus',id).customPOST(formData, 'update');
  }

  search(position,query) {
    return this.restangular.all('menus').customGET('search', {
      query: query,
      position:position
    });
  }
}
