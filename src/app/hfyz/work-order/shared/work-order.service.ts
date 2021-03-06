import {EventEmitter, Injectable} from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class WorkOrderService {
    change: EventEmitter<any>;

    constructor(public restangular: Restangular) {
        this.change = new EventEmitter();
    }

    list(max, offset) {
        return this.restangular.all('work-orders').customGET('list', { max: max, offset: offset });
    }

    details(id){
        return this.restangular.one('work-orders', id).customGET('show');
    }

    pendinglist(max, offset) {
        return this.restangular.all('work-orders').customGET('pending-work-order-list', { max: max, offset: offset });
    }

    feedbackList(max, offset) {
        return this.restangular.all('work-orders').customGET('feedback-work-order-list', { max: max, offset: offset });

    }

    preExamine(id) {
        return this.restangular.one('work-orders', id).customGET('pre-examine');
    }

    examine(id, params) {
        return this.restangular.one('work-orders', id).customPOST(params, 'examine');
    }

    preJudge(id) {
        return this.restangular.one('work-orders', id).customGET('pre-judge');
    }

    judge(id, params) {
        return this.restangular.one('work-orders', id).customPOST(params, 'judge');
    }

    preFeedback(id) {
        return this.restangular.one('work-orders', id).customGET('pre-feedback');
    }

    feedback(id, params) {
        return this.restangular.one('work-orders', id).customPOST(params, 'feedback');
    }

    statistic(params) {
        return this.restangular.all('work-orders').customGET('statistic', params);
    }

}
