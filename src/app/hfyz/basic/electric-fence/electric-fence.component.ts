import { CustomDialogService } from './../../common/shared/custom-dialog.service';
import { ElectricFenceService } from './shead/electric-fence.service';
import { ToastsManager } from 'ng2-toastr';
import { TdLoadingService } from '@covalent/core';
import { Component, OnInit } from '@angular/core';

declare var Maplet: any;
declare var mianMapObject: any;
declare var MPoint: any;
declare var MMarker: any;
declare var MIcon: any;
declare var MPolyline: any;
declare var MBrush: any;
declare var MEvent: any;

@Component({
    selector: 'app-electric-fence',
    templateUrl: './electric-fence.component.html',
    styleUrls: ['./electric-fence.component.css']
})
export class ElectricFenceComponent implements OnInit {
    electricFenceList: any;
    currentPage: number;
    max: any;
    total: any;
    pageFlag: string;
    maplet: any;
    showMaplet: any;
    marker: any;
    arrayPoint = [];
    line: any;
    coordinates: string;
    electricFenceName: string;
    electricFenceId: string;

    constructor(private _loadingService: TdLoadingService,
        private _electricFenceService: ElectricFenceService,
        private _customDialogService: CustomDialogService,
        private _toastr: ToastsManager) {
        this.electricFenceList = [];
        this.max = 10;
        this.total = 0;
        this.electricFenceName = '';
        this.electricFenceId = '';
        this.pageFlag = 'LIST'
    }

    ngOnInit() {
        this.maplet = new Maplet('electricFenceMap')
        this.showMaplet = new Maplet('showElectricFenceMap')
        mianMapObject.initMap(this.maplet, 'electricFenceMap');
        mianMapObject.initMap(this.showMaplet, 'showElectricFenceMap');
        this.initData();
    }

    initData(offset = 0) {
        this._loadingService.register();
        this._electricFenceService.search(this.electricFenceName, this.max, offset).subscribe(res => {
            this._loadingService.resolve();
            this.electricFenceList = res.resultList;
            this.total = res.total;
        })
    }

    search() {
    }

    reset() {
    }

    add() {
        this.pageFlag = 'CREATE';
        this.maplet.clearOverlays(true);
        this.arrayPoint = [];
        this.coordinates = '';
        mianMapObject.resetCenter(this.maplet, 116.35566, 39.93218);
        this.addPoint();
    }

    addLine(maplet, isEdit) {
        this.coordinates = '';
        maplet.clearOverlays(true);
        this.arrayPoint = this.processData(this.arrayPoint)
        this.line = new MPolyline(this.arrayPoint, new MBrush());
        maplet.addOverlay(this.line);
        this.addMEvent(maplet);
        for (let i = 0; i < this.arrayPoint.length; i++) {
            this.coordinates += this.arrayPoint[i].pid + ';';
        }
        console.log('===addLine==coordinates=' + JSON.stringify(this.coordinates));
        this.line.setEditable(isEdit);
    }

    processData(data) {
        if (data[0] !== data[data.length - 1]) {
            data.push(data[0])
        }
        return data
    }

    addMEvent(maplet) {
        const $this = this;
        MEvent.addListener(maplet, 'edit', overlay => {
            this.coordinates = '';
            console.log('====this.coordinates===addMEvent=1=' + this.coordinates)
            overlay.setEditable(true);
            for (let i = 0; i < overlay.pts.length; i++) {
                this.coordinates += overlay.pts[i].getPid() + ';';
            }
            console.log('====this.coordinates===addMEvent=2=' + this.coordinates)
        });
    }

    clean() {
        this.maplet.clearOverlays(true);
        this.arrayPoint = [];
        this.coordinates = '';
    }

    save() {
        this._loadingService.register()
        this._electricFenceService.save(this.electricFenceName, this.coordinates).subscribe(res => {
            this._loadingService.resolve();
            this.goBack();
            this._toastr.info('电子围栏添加成功.');
        })
    }

    delete(data) {
        const msg = '确认删除路标为【' + data.name + '】的记录吗？';
        const title = '删除';
        this._customDialogService.openBasicConfirm(title, msg).subscribe((accept: boolean) => {
            if (accept) {
                this._loadingService.register();
                this._electricFenceService.delete(data.id).subscribe(res => {
                    this._loadingService.resolve();
                    this._toastr.info('删除成功');
                    this.initData();
                })
            }
        })
    }

    show(id) {
        this.coordinates = '';
        this.arrayPoint = [];
        this._loadingService.register();
        this._electricFenceService.show(id).subscribe(res => {
            this._loadingService.resolve();
            this.pageFlag = 'SHOW';
            this.electricFenceName = res.electricFence.name
            this.coordinates = res.electricFence.coordinates
            const coordinateList = this.coordinates.substring(0, this.coordinates.length - 1).split(';');
            const firstCoordinate = coordinateList[0].split(',');
            console.log('====firstCoordinate====' + firstCoordinate);
            for (const item of coordinateList) {
                const point = item.split(',')
                console.log('====point====' + point);
                this.arrayPoint.push(new MPoint(point[0], point[1]))
            }
            mianMapObject.resetCenterAndScope(this.showMaplet, firstCoordinate[0], firstCoordinate[1], 9);
            this.addLine(this.showMaplet, false);
        })
    }

    addPoint() {
        const $this = this;
        this.maplet.setMode('bookmark', dataObj => {
            console.log('===point===' + dataObj.point.lon + '======' + dataObj.point.lat)
            $this.arrayPoint.push(new MPoint(dataObj.point.lon, dataObj.point.lat))
            $this.marker = new MMarker(
                dataObj.point,
                new MIcon('assets/images/b-1.gif', 12, 12)
            );
            $this.maplet.addOverlay($this.marker);
        });
    }

    edit(id) {
        this.electricFenceId = id;
        this.arrayPoint = [];
        this._loadingService.register();
        this._electricFenceService.edit(id).subscribe(res => {
            this._loadingService.resolve();
            this.pageFlag = 'EDIT';
            console.log('=====coordinates===show==' + JSON.stringify(this.coordinates))
            this.electricFenceName = res.electricFence.name
            this.coordinates = res.electricFence.coordinates
            const coordinateList = this.coordinates.substring(0, this.coordinates.length - 1).split(';');
            const firstCoordinate = coordinateList[0].split(',');
            for (const item of coordinateList) {
                const point = item.split(',')
                console.log('====point====' + point);
                this.arrayPoint.push(new MPoint(point[0], point[1]))
            }
            mianMapObject.resetCenterAndScope(this.maplet, firstCoordinate[0], firstCoordinate[1], 9);
            this.addLine(this.maplet, true);
            this.addPoint();
        })
    }

    update() {
        this._loadingService.register();
        this._electricFenceService.update(this.electricFenceId, this.electricFenceName, this.coordinates).subscribe(res => {
            this._loadingService.resolve();
            this.goBack();
            this._toastr.info('电子围栏修改成功.');
        })
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }

    goBack() {
        this.electricFenceName = '';
        this.initData();
        this.electricFenceList = [];
        this.max = 10;
        this.total = 0;
        this.pageFlag = 'LIST'
    }

}
