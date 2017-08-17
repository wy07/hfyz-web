import { Component, OnInit, OnDestroy, ElementRef, Renderer, Input } from '@angular/core';
@Component({
    selector: 'map-tabs-bar',
    templateUrl: 'map-tabs-bar.component.html',
    styleUrls: ['map-tabs-bar.component.css']
})
export class MapTabsBarComponent implements OnInit {
    @Input() historyDataTOP10 = [];
    @Input() alarmDataTOP10 = [];
    @Input() type = '';
    isShow: boolean;

    constructor() {
        this.isShow = false;
    }

    ngOnInit() {
    }

    showTab() {
        this.isShow = !this.isShow;
    }

}
