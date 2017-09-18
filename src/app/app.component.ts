import { environment } from './../environments/environment';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { EventBuservice } from './hfyz/common/shared/eventbus.service';
import { PlatFormService } from './hfyz/basic/platForm/shared/plat-form.service';
import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

    displayDialog: boolean;
    inspectInfo: any;
    time: number;
    timer: any;

    constructor(private toastr: ToastsManager
        , private eventBuservice: EventBuservice
        , private platFormService: PlatFormService
        , vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
        this.displayDialog = false;
        this.inspectInfo = {};
        this.time = 0;
    }

    ngOnInit() {
        moment.locale('zh-cn');
        this.inspectRegisterHandler();
    }

    inspectRegisterHandler() {
        const $this = this;
        this.eventBuservice.notify.subscribe((inputs: any) => {
            if (inputs.type === 'inspect') {
                this.eventBuservice.inspectRegisterHandler('inspect', inputs.companyCode, res => {
                    clearInterval($this.timer);
                    $this.displayDialog = true;
                    $this.inspectInfo = res;
                    console.log('=====$this.inspectInfo=====' + JSON.stringify($this.inspectInfo));
                    const now = new Date().getTime();
                    const dateCreated = new Date(Date.parse($this.inspectInfo.dateCreated.replace(/-/g, '/'))).getTime();
                    $this.time = Math.floor((dateCreated + 300000 - now) / 1000);
                    $this.timer = setInterval(() => {
                        $this.time = $this.time - 1;
                        if ($this.time <= 0) {
                            $this.displayDialog = false;
                            clearInterval($this.timer);
                        }
                    }, 1000);
                })
            }
        })
    }

    inspect(id) {
        this.platFormService.inspect(id, this.inspectInfo.answer).subscribe(
            res => {
                this.displayDialog = false;
                this.toastr.success('查岗应答成功！');
                clearInterval(this.timer);
            }
        );
    }

    showTime(time) {
        let str = '';
        const min = Math.floor(time / 60);
        const sec = time % 60;

        if (min > 0) {
            str += `${min}分`;
        }
        str += `${sec}秒`;
        return str;
    }
}
