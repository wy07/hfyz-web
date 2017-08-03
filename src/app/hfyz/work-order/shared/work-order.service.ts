import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class WorkOrderService {
  constructor(public restangular: Restangular) {
  }

  list(max, offset) {
    return this.restangular.all('work-orders').customGET('find-list-and-total', {max: max, offset: offset});
  }
}
