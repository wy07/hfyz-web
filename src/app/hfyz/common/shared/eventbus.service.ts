import {Injectable, EventEmitter} from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class EventBuservice {
  private eb;
  notify:EventEmitter<any>;


  constructor(public restangular: Restangular) {
    this.eb=null;
    this.notify = new EventEmitter();
  }

  setEb(eb){
    this.eb=eb;
  }

  getEb(){
    return this.eb;
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
