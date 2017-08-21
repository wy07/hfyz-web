import { PassLinePhysicalBasicService } from './sheard/pass-line-physical-basic.service';
import { PassLinePhysicalBasicInfo } from './sheard/pass-line-physical-basic-info.model';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { RegularService } from '../../common/shared/regular.service';

@Component({
    selector: 'pass-line-physical-basic',
    templateUrl: './pass-line-physical-basic.component.html',
    styleUrls: ['./pass-line-physical-basic.component.css']
})
export class PassLinePhysicalBasicComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    pageFlag: string;
    passLinePhysicalBasicInfo: PassLinePhysicalBasicInfo;
    passLinePhysicalBasicInfos: Array<PassLinePhysicalBasicInfo>;
    lineCode: string;
    lineName: string;

    constructor(private _loadingService: TdLoadingService,
        private _regularService: RegularService,
        private datePipe: DatePipe,
        private _passLinePhysicalBasicService: PassLinePhysicalBasicService,
        private toastr: ToastsManager) {
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.lineCode = '';
        this.lineName = '';
        this.pageFlag = 'LIST';
        this.passLinePhysicalBasicInfos = [];

    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this._loadingService.register();
        this._passLinePhysicalBasicService.search(this.lineCode, this.lineName, this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.passLinePhysicalBasicInfos = res.resultList;
                    this.pageTotal = res.total;
                    this.pageOffset = this.pageFirst;
                } else {
                    this.toastr.error(res.errors)
                }
            }
        )
    }

    search() {
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData()
    }

    showDetail(id) {
        this._loadingService.register();
        this._passLinePhysicalBasicService.show(id).subscribe(res => {
            this._loadingService.resolve();
            this.passLinePhysicalBasicInfo = res.instance;
            this.pageFlag = 'DETAIL';
        });
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.loadData();
        }
    }

    reset() {
        this.lineCode = '';
        this.lineName = '';
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.loadData();
    }

    switchPage() {
        this.pageFlag = 'LIST'
    }



}
