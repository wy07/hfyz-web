import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as EventBus from 'vertx3-eventbus-client';

@Injectable()
export class EventBuservice {
  private eb;


  constructor(public restangular: Restangular) {
    this.eb = null;
  }


  setEb(eb) {
    this.eb = eb;
  }

  getEb() {
    return this.eb;
  }

  carRealTimeRegisterHandler(address): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('======carRealTimeRegisterHandler=====' + address);
      if (typeof (this.eb) === 'undefined' || !this.eb) {
        this.eb = new EventBus(environment.eventBusUrl, {});
      }

      this.eb.onopen = function () {
        this.eb.registerHandler(address, function(res, rej) {
          resolve(res)
          reject(rej)
        });
      }
    })
  }

  unregisterHandler(address, callback) {
    this.eb.unregisterHandler(address, callback);
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
