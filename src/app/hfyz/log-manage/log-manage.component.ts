import { Component, OnInit } from '@angular/core';
import { ChartModule, PanelModule } from 'primeng/primeng';
@Component({
    selector: 'log-manage',
    templateUrl: 'log-manage.component.html',
    styleUrls: ['log-manage.component.css']
})

export class LogManageComponent implements OnInit {

    ngOnInit() {
        console.log('=====LogManageComponent=====');
    }
};
