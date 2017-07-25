import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { EventBuservice } from './hfyz/common/shared/eventbus.service';
import * as EventBus from 'vertx3-eventbus-client';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  displayDialog: boolean;

  constructor(private toastr: ToastsManager
    , private eventBuservice: EventBuservice
    , vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.displayDialog = false;
  }

  ngOnInit() {
    console.log('in AppComponent');
    let eb = new EventBus('http://127.0.0.1:8001/eventbus', {});
    console.log(eb);
    console.log(eb.o);
    let $this = this;
    eb.onopen = function () {
      eb.registerHandler('test.hello', function (err, res) {
        console.log('test.hello====callback');
        console.log(JSON.stringify(res));
      });

      eb.registerHandler('lms.data.京G79489', function (err, res) {
        console.log('lms.data.京G79489====callback');
        console.log('======lms.data.京G79489=====' + JSON.stringify(res));
      });

      eb.registerHandler('inspect.response.0001', function (err, res) {
        console.log('inspect.response.0001====callback');
        console.log(res);
        console.log(JSON.stringify(res));
        alert('查岗');
        $this.displayDialog = true;
        // 发送请求
      });

      $this.eventBuservice.setEb(eb);
    }
  }
}
