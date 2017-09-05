import { environment } from './../../../../environments/environment';
// import * as EventBus from 'vertx3-eventbus-client';
import { Injectable, EventEmitter } from '@angular/core';
import { Restangular } from 'ngx-restangular';

declare var vertx: any;

@Injectable()
export class EventBuservice {
    eventBus: any;
    notify: EventEmitter<any>;


    constructor(public restangular: Restangular) {
        this.eventBus = {};
        this.notify = new EventEmitter();
    }

    carRealTimeRegisterHandler(key, code, callback) {
        const address = 'hfyz.data.' + code;
        if (typeof (this.eventBus[key]) === 'undefined' || !this.eventBus[key]) {
            this.eventBus[key] = new vertx.EventBus(environment.eventBusUrl);
        }
        if (this.eventBus[key].readyState() === vertx.EventBus.OPEN) {
            this.eventBus[key].registerHandler(address, callback);
        } else {
            const $this = this;
            this.eventBus[key].onopen = function () {
                $this.eventBus[key].registerHandler(address, callback);
            }
        }
    }

    unregisterHandler(key, code) {
        const address = 'hfyz.data.' + code;
        if (typeof (this.eventBus[key]) !== 'undefined' || this.eventBus[key]) {
            if (this.eventBus[key].readyState() === vertx.EventBus.OPEN) {
                this.eventBus[key].unregisterHandler(address);
            }
        }
    }


    inspectRegisterHandler(key, code, callback) {
        const address = 'inspect.response.' + code;
        if (typeof (this.eventBus[key]) === 'undefined' || !this.eventBus[key]) {
            this.eventBus[key] = new vertx.EventBus(environment.eventBusUrl);
        }
        if (this.eventBus[key].readyState() === vertx.EventBus.OPEN) {
            this.eventBus[key].registerHandler(address, callback);
        } else {
            const $this = this;
            this.eventBus[key].onopen = function () {
                $this.eventBus[key].registerHandler(address, callback);
            }
        }
    }

    inspectSend(key, address, data, callback) {
        if (typeof (this.eventBus[key]) === 'undefined' || !this.eventBus[key]) {
            this.eventBus[key] = new vertx.EventBus(environment.eventBusUrl);
        }
        if (this.eventBus[key].readyState() === vertx.EventBus.OPEN) {
            this.eventBus[key].send(address, data, callback)
        } else {
            const $this = this;
            this.eventBus[key].onopen = function () {
                $this.eventBus[key].send(address, data, callback)
            }
        }
    }



    closeEventBus(key) {
        if (typeof (this.eventBus[key]) !== 'undefined' && this.eventBus[key] && this.eventBus[key].readyState() === vertx.EventBus.OPEN) {
            this.eventBus[key].close();
        }
        this.eventBus[key] = null;
    }
}
