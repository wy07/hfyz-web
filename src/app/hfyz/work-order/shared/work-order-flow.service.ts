import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class WorkOrderFlowService {
    constructor(public restangular: Restangular) {
    }

    list(max, offset) {
        return this.restangular.all('work-order-flows').customGET('', { max: max, offset: offset });
    }

    creat() {
        return this.restangular.all('work-order-flows').customGET('create');
    }

    effect(id) {
        return this.restangular.one('work-order-flows', id).customPOST({}, 'effect');
    }

    edit(id) {
        return this.restangular.one('work-order-flows', id).customGET('edit');
    }

    show(id) {
        return this.restangular.one('work-order-flows', id).customGET('');
    }

    save(params) {
        return this.restangular.all('work-order-flows').customPOST(params);
    }


    update(id, params) {
        return this.restangular.one('work-order-flows', id).customPOST(params);
    }

}
