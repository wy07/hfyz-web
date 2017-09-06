import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class LayoutService {
    constructor(public restangular: Restangular) {
    }

    list() {
        return this.restangular.all('in-boxs').customGET('list');
    }
}
