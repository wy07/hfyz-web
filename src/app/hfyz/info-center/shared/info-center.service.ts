import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class InfoCenterService {
    constructor(public restangular: Restangular) {
    }

    list(max, offset) {
        return this.restangular.all('in-boxs').customGET('list', {max: max, offset: offset});
    }

    changeState(id) {
        return this.restangular.one('in-boxs', id).customGET('change-state');
    }
}
