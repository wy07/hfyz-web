import { environment } from './../../../../environments/environment';
// import * as EventBus from 'vertx3-eventbus-client';
import { Injectable, EventEmitter } from '@angular/core';
import { Restangular } from 'ngx-restangular';

declare var vertx: any;

@Injectable()
export class EventBuservice {
    eventBus;
    notify: EventEmitter<any>;


    constructor(public restangular: Restangular) {
        this.eventBus = null;
        this.notify = new EventEmitter();
    }

    carRealTimeRegisterHandler(code, callback) {
        const address = 'hfyz.data.' + code;
        if (typeof (this.eventBus) === 'undefined' || !this.eventBus) {
            this.eventBus = new vertx.EventBus(environment.eventBusUrl);
        }
        if (this.eventBus.readyState() === vertx.EventBus.OPEN) {
            this.eventBus.registerHandler(address, callback);
        } else {
            const $this = this;
            this.eventBus.onopen = function () {
                $this.eventBus.registerHandler(address, callback);
            }
        }
    }

    inspectRegisterHandler(code, callback) {
        const address = 'inspect.response.' + code;
        if (typeof (this.eventBus) === 'undefined' || !this.eventBus) {
            this.eventBus = new vertx.EventBus(environment.eventBusUrl);
        }
        if (this.eventBus.readyState() === vertx.EventBus.OPEN) {
            this.eventBus.registerHandler(address, callback);
        } else {
            const $this = this;
            this.eventBus.onopen = function () {
                $this.eventBus.registerHandler(address, callback);
            }
        }
    }

    inspectSend(address, data, callback) {
        if (typeof (this.eventBus) === 'undefined' || !this.eventBus) {
            this.eventBus = new vertx.EventBus(environment.eventBusUrl);
        }
        if (this.eventBus.readyState() === vertx.EventBus.OPEN) {
            this.eventBus.send(address, data, callback)
        } else {
            const $this = this;
            this.eventBus.onopen = function () {
                $this.eventBus.send(address, data, callback)
            }
        }
    }

    unregisterHandler(code, callback?) {
        const address = 'hfyz.data.' + code;
        if (typeof (this.eventBus) === 'undefined' || !this.eventBus) {
            this.eventBus = new vertx.EventBus(environment.eventBusUrl);
        }
        if (this.eventBus.readyState() === vertx.EventBus.OPEN) {
            this.eventBus.unregisterHandler(address, callback);
        } else {
            const $this = this;
            this.eventBus.onopen = function () {
                $this.eventBus.unregisterHandler(address, callback);
            }
        }
    }

    closeEventBus() {
        if (typeof (this.eventBus) !== 'undefined' && this.eventBus && this.eventBus.readyState() === vertx.EventBus.OPEN) {
            this.eventBus.close();
        }
        this.eventBus = null;
    }

    //  eventBus(){
    //   console.log("====eventBus")
    //   if(this.eb==null){
    //     console.log("====new eventBus")
    //     this.eb = new EventBus('http://127.0.0.1:8001/eventbus',{});
    //   }
    //    console.log("====return eventBus")
    //    this.eb.onopen=function(){
    //      console.log("====open")
    //      this.eb.registerHandler("test.hello", function(err, res) {
    //        console.log("test.hello====callback")
    //        console.log(JSON.stringify(res))
    //      });
    //
    //      this.eb.registerHandler("inspect.response.0001", function(err, res) {
    //        console.log("inspect.response.0001====callback");
    //        console.log(res)
    //        console.log(JSON.stringify(res))
    //      });
    //    };
    //   return this.eb;
    // }


}
