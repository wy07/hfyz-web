import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class LayoutService {
    constructor(public restangular: Restangular) {
    }

    unreadMessage() {
        return this.restangular.all('in-boxs').customGET('unread-message');
    }
}
