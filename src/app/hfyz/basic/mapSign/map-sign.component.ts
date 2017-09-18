import { RegularService } from './../../common/shared/regular.service';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { MapSignService } from './shared/map-sign.service';
import DateTimeFormat = Intl.DateTimeFormat;
import { TdLoadingService } from '@covalent/core';
import {CustomDialogService} from '../../common/shared/custom-dialog.service';

declare var Maplet: any;
declare var mianMapObject: any;
declare var MPoint: any;
declare var MMarker: any;
declare var MIcon: any;
declare var MInfoWindow: any;
declare var MBrush: any;
declare var MPolyline: any;
declare var MEvent: any;

@Component({
    selector: 'map-sign',
    templateUrl: 'map-sign.component.html',
    styleUrls: ['map-sign.component.css']
})

export class MapSignComponent implements OnInit {
    pageMax: number;
    pageTotal: number;
    pageFirst: number;
    pageOffset: number;

    mapSignList: any;

    action: string;
    formTitle: string;

    typeList: any[];
    isAdd: boolean;
    mapSign: any;

    maplet: any;
    mode: any;

    constructor(private _toastr: ToastsManager
        , private _mapSignService: MapSignService
        , private _loadingService: TdLoadingService
        , private _regularService: RegularService
        , private _customDialogService: CustomDialogService) {
        this.pageMax = 10;
        this.pageTotal = 0;
        this.pageFirst = 0;
        this.pageOffset = 0;
        this.mapSignList = [];
        this.action = 'list';
        this.typeList = [];
        this.mapSign = {};
    }

    ngOnInit() {
        this.initData();
        this.initMap();
    }

    initMap() {
        this.maplet = new Maplet('mapSignMap')
        mianMapObject.initMap(this.maplet, 'mapSignMap');
    }

    initData() {
        this._loadingService.register();
        this._mapSignService.list(this.pageMax, this.pageFirst).subscribe(
            res => {
                this._loadingService.resolve();
                this.mapSignList = res.mapSignList;
                this.pageTotal = res.total;
                this.pageOffset = this.pageFirst;
            }
        );
    }

    delete(mapSign) {
        const msg = '确认删除路标为【' + mapSign.name + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._mapSignService.delete(mapSign.id).subscribe(res => {
                    this._loadingService.resolve();
                    this._toastr.info('删除成功！');
                    this.initData();
                })
            }
        })
    }

    changeDisplay(mapSign) {
        const msg = '确认修改路标【' + mapSign.name + '】的状态吗？';
        const title = '修改';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._mapSignService.changeDisplay(mapSign.id, !mapSign.display).subscribe(res => {
                    this._loadingService.resolve();
                    this._toastr.success('修改成功！');
                    this.initData();
                })
            }
        })
    }

    paginate(event) {
        if (this.pageOffset !== event.first) {
            this.initData();
        }
    }

    onCreate() {
        this._loadingService.register();
        this._mapSignService.mapSignTypeList().subscribe(
            res => {
                this.mapSign = {};
                this._loadingService.resolve();
                this.typeList = res.typeList;
                this.formTitle = '新增';
                this.isAdd = true;
                this.action = 'update';
                this.setMode();
            })
    }

    setMode() {
        const $this = this;
        this.maplet.setMode('bookmark', dataObj => {
            $this.mapSign.longitude = dataObj.point.lon;
            $this.mapSign.latitude = dataObj.point.lat;
            $this.addPoint(dataObj.point.lon, dataObj.point.lat);
            if (this.mode === undefined) {
                this.addMEvent();
            }
        });
    }

    addMEvent() {
        const $this = this;
        MEvent.addListener(this.maplet, 'edit', overlay => {
            const point = overlay.pt.pid.split(',')
            $this.mapSign.longitude = point[0];
            $this.mapSign.latitude = point[1];
            overlay.setEditable(false);
            $this.addPoint(point[0], point[1])
        });
    }

    addPoint(longitude, latitude) {
        this.maplet.clearOverlays(true);
        const marker = new MMarker(
            new MPoint(`${longitude},${latitude}`),
            new MIcon(`<img class='con' src='assets/images/b-1.gif'  width='32px' height='32px'/><br/>
            <span style='margin-left: 25px;margin-top: -15px;width:100px;
            display:block;font-size:10px;color:red'> ${longitude},${latitude} </span>`, 32, 32)
        );
        this.maplet.addOverlay(marker);
        this.maplet.setMode('pan');
        marker.setEditable(true);
    }

    save() {
        if (this._regularService.isBlank(this.mapSign.display)) {
            this.mapSign.display = false;
        }
        if (this.validate()) {
            this.mapSign.mapSignType = { id: this.mapSign.typeId };
            this._mapSignService.save(this.mapSign).subscribe(
                res => {
                    this.action = 'list';
                    this._toastr.success('保存成功！');
                    this.initData();
                }
            );
        }
    }

    onEdit(mapSign) {
        this.preEdit(mapSign.id)
    }

    preEdit(id) {
        this._loadingService.register();
        this._mapSignService.edit(id).subscribe(
            res => {
                this.action = 'update';
                this.isAdd = false;
                this.formTitle = '编辑';
                this._loadingService.resolve();
                this.mapSign = res.mapSign;
                this.typeList = res.typeList;
                mianMapObject.resetCenter(this.maplet, res.mapSign.longitude, res.mapSign.latitude);
                this.addPoint(res.mapSign.longitude, res.mapSign.latitude);
                if (this.mode === undefined) {
                    this.addMEvent();
                }
            }
        );
    }

    update() {
        if (this.validate()) {
            this.mapSign.mapSignType = { id: this.mapSign.typeId };
            this._mapSignService.update(this.mapSign.id, this.mapSign).subscribe(
                res => {
                    this.action = 'list';
                    this._toastr.success('修改成功！');
                    this.initData();
                }
            );
        }
    }

    validate() {
        if (this._regularService.isBlank(this.mapSign.name)) {
            this._toastr.error('名称不能为空！');
            return false;
        }

        if (this._regularService.isBlank(this.mapSign.typeId)) {
            this._toastr.error('类型不能为空！');
            return false;
        }

        if (this._regularService.isBlank(this.mapSign.longitude)) {
            this._toastr.error('类型不能为空！');
            return false;
        }


        if (this._regularService.isBlank(this.mapSign.latitude)) {
            this._toastr.error('纬度不能为空！');
            return false;
        }

        return true;
    }
}
