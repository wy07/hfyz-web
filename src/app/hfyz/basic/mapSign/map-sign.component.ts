import {Component, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {MapSignService} from './shared/map-sign.service';
import DateTimeFormat = Intl.DateTimeFormat;
import {TdLoadingService} from "@covalent/core";

@Component({
    selector: 'map-sign',
    templateUrl: 'map-sign.component.html',
    styleUrls: ['map-sign.component.css']
})

export class MapSignComponent implements OnInit {
    mapSignList: any;
    currentPage: number;
    max: any;
    total: any;

    constructor(private _toastr: ToastsManager
        , private _mapSignService: MapSignService
        , private _loadingService: TdLoadingService) {
        this.mapSignList = [];
        this.max = 10;
        this.total = 0;
    }

    ngOnInit() {
        this.initData();
    }

    initData(offset = 0) {
        this._loadingService.register();
        this._mapSignService.list(this.max, offset).subscribe(
            res => {
                this._loadingService.resolve();
                this.mapSignList = res.mapSignList;
                this.total = res.total;
            }
        );
    }

    delete(mapSign) {
        if (confirm('确认删除"' + mapSign.name + '"路标？')) {
            this._mapSignService.delete(mapSign.id).subscribe(
                res => {
                    this.initData();
                    this._toastr.info(`删除成功`);
                }
            );
        }
    }

    changeDisplay(mapSign) {
        if (confirm('确认修改"' + mapSign.name + '"路标状态？')) {
            this._mapSignService.changeDisplay(mapSign.id, !mapSign.display).subscribe(
                res => {
                    this.initData();
                    this._toastr.info(`修改成功`);
                }
            );
        }
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }
}
