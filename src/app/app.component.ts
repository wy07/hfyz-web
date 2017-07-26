import {Component, ViewContainerRef, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {EventBuservice} from "./hfyz/common/shared/eventbus.service";
import * as EventBus from 'vertx3-eventbus-client';
import {PlatFormService} from "./hfyz/basic/platForm/shared/plat-form.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit{

  displayDialog:boolean;
  inspectInfo:any;
  time:number;
  timer:any;

  constructor( private toastr: ToastsManager
    , private eventBuservice: EventBuservice
    , private platFormService: PlatFormService
    , vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.displayDialog=false;
    this.inspectInfo={};
    this.time=0;
  }

  showTime(time){
    let str='';
    let min=Math.floor(time/60);
    let sec=time%60;

    if(min>0){
      str+=`${min}分`;
    }
    str+=`${sec}秒`;
    return str;
  }



  ngOnInit() {
    console.log("in AppComponent")
    let eb = new EventBus('http://127.0.0.1:8001/eventbus',{});
    console.log(eb)
    console.log(eb.o)
    let $this=this;
    eb.onopen = function () {
      eb.registerHandler("test.hello", function (err, res) {
        console.log("test.hello====callback");
        console.log(JSON.stringify(res))
      });

      eb.registerHandler("inspect.response.0001", function (err, res) {
        clearInterval($this.timer);
        $this.displayDialog=true;
        $this.inspectInfo=res.body;
        let now=new Date().getTime();
        let dateCreated = new Date(Date.parse($this.inspectInfo.dateCreated.replace(/-/g,   "/"))).getTime();
        $this.time=Math.floor((dateCreated+300000-now)/1000);
        $this.timer = setInterval(() => {
          console.log("------1")
          $this.time=$this.time-1;
          if($this.time<=0){
            $this.displayDialog=false;
            clearInterval($this.timer);
          }
        }, 1000);
      });
      $this.eventBuservice.setEb(eb);
    }
  }

  inspect(id){
    this.platFormService.inspect(id,this.inspectInfo.answer).subscribe(
      res=>{
        this.displayDialog=false;
        this.toastr.info("查岗应答成功");
        clearInterval(this.timer);
      }
    );
  }
}
