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
    marker: any;
    arrayPoint = [];
    line: any;
    coordinates = [];

    constructor(private _loadingService: TdLoadingService,
        private _toastr: ToastsManager) {
        this.electricFenceList = [];
        this.max = 10;
        this.total = 0;
        this.pageFlag = 'LIST'
    }

    ngOnInit() {
        this.maplet = new Maplet('electricFenceMap')
        mianMapObject.initMap(this.maplet, 'electricFenceMap');
    }

    initData(offset = 0) {
        // this._loadingService.register();
    }

    search() {
    }

    reset() {
    }

    add() {
        this.pageFlag = 'CREATE';
        const $this = this;
        this.maplet.setMode('bookmark', dataObj => {
            console.log('===point===' + dataObj.point.lon + '======' + dataObj.point.lat)
            console.log('===arrayPoint==0==' + JSON.stringify($this.arrayPoint));
            $this.arrayPoint.push(new MPoint(dataObj.point.lon, dataObj.point.lat))
            $this.marker = new MMarker(
                dataObj.point,
                new MIcon('assets/images/b-1.gif', 12, 12)
            );
            $this.maplet.addOverlay($this.marker);
        });
    }

    addLine() {
        this.maplet.clearOverlays(true);
        // this.arrayPoint.push(this.arrayPoint[0])
        this.arrayPoint = this.processData(this.arrayPoint)
        this.line = new MPolyline(this.arrayPoint, new MBrush());
        this.maplet.addOverlay(this.line);
        this.addMEvent();
        for (const item of this.arrayPoint) {
            this.coordinates.push(item.pid);
        }
        console.log('===addLine==coordinates=' + JSON.stringify(this.coordinates));
        this.line.setEditable(true);
    }

    processData(data) {
        // console.log('====data[0]==1=' + JSON.stringify(data[0]))
        // console.log('====data[0]==2=' + JSON.stringify(data[data.length - 1]))
        if (data[0] !== data[data.length - 1]) {
            console.log('======processData push=======')
            data.push(data[0])
        }
        return data
    }

    addMEvent() {
        this.coordinates = [];
        const $this = this;
        MEvent.addListener(this.maplet, 'edit', overlay => {
            overlay.setEditable(true);
            // for (const item of overlay.pts) {
            //     // console.log('=======item======' + JSON.stringify(item))
            //     this.coordinates.push(item.getPid())
            // }
            // console.log('===addMEvent==coordinates=' + JSON.stringify(this.coordinates));
            // console.log('===addMEvent==overlay=' + JSON.stringify(overlay.pts));
            let msg = '';
            for (let i = 0; i < overlay.pts.length; i++) {
                msg += overlay.pts[i].getPid() + ';';
            }
            // alert('折线对象点集合：\n' + msg.substring(0, msg.length - 1));
            this.coordinates = msg.substring(0, msg.length - 1).split(';')
            console.log('===addMEvent==coordinates=' + JSON.stringify(this.coordinates));
        });
    }

    clean() {
        this.maplet.clearOverlays(true);
        this.arrayPoint = [];
        this.coordinates = [];
    }

    save() {
        console.log('====coordinates===' + JSON.stringify(this.coordinates))
    }

    paginate(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.initData(this.max * event.page);
        }
    }

}
