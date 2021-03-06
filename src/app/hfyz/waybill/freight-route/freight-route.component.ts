import { FreightRouter } from './sheard/freightRouter.model';
import { FreightRouteService } from './sheard/freight-route.service';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from '@covalent/core';
import { DatePipe } from '@angular/common';
import { RegularService } from '../../common/shared/regular.service';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';

@Component({
    selector: 'freight-route',
    templateUrl: './freight-route.component.html',
    styleUrls: ['./freight-route.component.css']
})
export class FreightRouteComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    freightRouter: FreightRouter;

    pageFlag: string; // 页面切换  LIST 列表页 ADD 新增页 EDIT 修改页

    waybillRouteLists: Array<FreightRouter>;

    constructor(private _loadingService: TdLoadingService,
        private _regularService: RegularService,
        private _freightRouteService: FreightRouteService,
        private datePipe: DatePipe,
        private toastr: ToastsManager,
        private _customDialogService: CustomDialogService) {
        this.waybillRouteLists = [];
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.pageFlag = 'LIST';
        this.initData();
    }

    initData() {
        this.freightRouter = {
            id: '', routerName: '', startProvince: '', startProvinceCode: '', startCity: '', startCityCode: '',
            startDistrict: '', startDistrictCode: '', endProvince: '', endProvinceCode: '', endCity: '',
            endCityCode: '', endDistrict: '', endDistrictCode: '', viaLand: '', provenance: '', destination: ''
        }
    }

    ngOnInit() {
        this.loadData();
    }

    /**
     * 加载表格数据
     */
    loadData() {
        this._loadingService.register()
        this._freightRouteService.getFreightRouterList(this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve();
                if (res.result === 'success') {
                    this.waybillRouteLists = res.resultList
                    this.pageTotal = res.total;
                    this.pageOffset = this.pageFirst;
                } else {
                    this.toastr.error(res.errors)
                }
            }
        )
    }

    /**
     * 分页插件p-paginator方法
     * @param event
     */
    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.loadData();
        }
    }

    create() {
        this.initData();
        this.pageFlag = 'ADD';
    }

    save() {
        console.log('====this.freightRouter====' + JSON.stringify(this.freightRouter))
        this._loadingService.register();
        this._freightRouteService.save(this.freightRouter).subscribe(res => {
            this._loadingService.resolve();
            if (res.result === 'success') {
                this.toastr.success('保存成功！');
                this.switchPage();
            }
        });
    }

    delete(data) {
        const msg = '确认删除危货路线为【' + data.routerName + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._freightRouteService.delete(data.id).subscribe(res => {
                    this._loadingService.resolve();
                    this.toastr.info('删除成功！');
                    if (res.result === 'success') {
                        this.switchPage();
                    }
                })
            }
        })
    }

    edit(id) {
        this._loadingService.register();
        this._freightRouteService.edit(id).subscribe(res => {
            console.log('===edit===' + JSON.stringify(res));
            this._loadingService.resolve();
            this.freightRouter = res.freightRouter;
            this.pageFlag = 'EDIT';
        });
    }

    update() {
        this._loadingService.register();
        this._freightRouteService.update(this.freightRouter).subscribe(res => {
            this._loadingService.resolve();
            if (res.result === 'success') {
                this.toastr.success('修改成功！');
                this.switchPage();
            }
        });
    }

    switchPage() {
        this.pageFlag = 'LIST'
        this.loadData();
    }

    selectCity(event, type) {
        console.log('===e==' + JSON.stringify(event));
        if (type === 'provenance') {
            const provenance = event.name.split('/');
            const provenanceCode = event.value.split('/');
            this.freightRouter.provenance = event.name;
            this.freightRouter.startProvince = provenance[0];
            this.freightRouter.startCity = provenance[1];
            this.freightRouter.startDistrict = provenance[2];
            this.freightRouter.startProvinceCode = provenanceCode[0];
            this.freightRouter.startCityCode = provenanceCode[1];
            this.freightRouter.startDistrictCode = provenanceCode[2];
        } else {
            const destination = event.name.split('/');
            const destinationCode = event.value.split('/');
            this.freightRouter.destination = event.name;
            this.freightRouter.endProvince = destination[0];
            this.freightRouter.endCity = destination[1];
            this.freightRouter.endDistrict = destination[2];
            this.freightRouter.endProvinceCode = destinationCode[0];
            this.freightRouter.endCityCode = destinationCode[1];
            this.freightRouter.endDistrictCode = destinationCode[2];
        }
    }

    showDetail(id) {
        this._loadingService.register();
        this._freightRouteService.show(id).subscribe(res => {
            this._loadingService.resolve();
            this.freightRouter = res.freightRouter;
            this.pageFlag = 'DETAIL';
        });
    }
}
