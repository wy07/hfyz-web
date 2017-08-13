import {Component, Injector, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {TdLoadingService} from '@covalent/core';
import {StatisticService} from '../../shared/statistic.service';
import {LayoutComponent} from '../../../layout/main-tab/layout.component';
import {MapService} from '../../../map/shared/map.service';
@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {
  detailList: any;
  max: number;
  total: number;
  currentPage: number;
  licenseNo: string;
  layoutComponent: any;
  ownerName: any;
  type: any;
  status: any;
    constructor(
     private _toastr: ToastsManager
    , private _statisticService: StatisticService
    , private _loadingService: TdLoadingService
    , private _mapService: MapService
    , private inj: Injector
    ) {
    this.max = 10;
    this.licenseNo = '';
    this.layoutComponent = this.inj.get(LayoutComponent);
    this._mapService.change.subscribe((inputs: any) => {
        console.log('=======inputs=======' + JSON.stringify(inputs));
        console.log('=inputs.ownerNamev====' + inputs.ownerName);
        this.ownerName = inputs.ownerName;
        this.type = inputs.type;
        this.status = inputs.status;
    })
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    if (!this.validation_search()) {
      return false;
    }
    this._loadingService.register();
    this._statisticService.detailList(this.max, offset, this.licenseNo, this.ownerName, this.type, this.status).subscribe(
      res => {
        this._loadingService.resolve();
        this.detailList = res.detailList;
        this.total = res.total;
      }
    );
  }
  paginate(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.initData(this.max * event.page);
    }
  }
  validation_search() {
    return true;
  }
    showRealTimeMap(item) {
    const menu = { name: '实时状态', icon: 'fa-map', code: 'realTimeMap', inputs: { frameNo: item.licenseNo, id: item.frameNo } };
    this.layoutComponent.addTab(menu);
  }
  cancel() {
    this.licenseNo = '';
    this.initData();
  }
}
