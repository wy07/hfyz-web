import { Component, Injector, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { StatisticService } from '../../shared/statistic.service';
import { LayoutComponent } from '../../../layout/main-tab/layout.component';
@Component({
  selector: 'app-dangerous-statistic',
  templateUrl: './dangerous-statistic.component.html',
  styleUrls: ['./dangerous-statistic.component.css']
})
export class DangerousStatisticComponent implements OnInit {
  pageMax: number;
  pageTotal: number;
  pageFirst: number;
  pageOffset: number;

  dangerousStatisticList: any;
  company: string;
  layoutComponent: any;
  constructor(
    private _statisticService: StatisticService
    , private _loadingService: TdLoadingService
    , private inj: Injector
  ) {

    this.pageMax = 10;
    this.pageTotal = 0;
    this.pageFirst = 0;
    this.pageOffset = 0;
    this.company = '';
    this.layoutComponent = this.inj.get(LayoutComponent);
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    this._loadingService.register();
    this._statisticService.dangerousList(this.pageMax, this.pageFirst, this.company).subscribe(
      res => {
        this._loadingService.resolve();
        this.dangerousStatisticList = res.dangerousStatisticList;
        this.pageTotal = res.total;
        this.pageOffset = this.pageFirst;
      }
    );
  }
  paginate(event) {
    if (this.pageOffset !== event.first) {
      this.initData();
    }
  }
  onSearch() {
    this.pageFirst = 0;
    this.pageOffset = 0;
    this.initData();
  }
  showOnline(travel) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: travel.ownerName
        , type: 'dangerous', status: 'online'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  showOnlineing(travel) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: travel.ownerName
        , type: 'dangerous', status: 'onlineing'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  showCrossCar(travel) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: travel.ownerName
        , type: 'dangerous', status: 'crossCar'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  showWarning(travel) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: travel.ownerName
        , type: 'dangerous', status: 'waring'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  onReset() {
    this.company = '';
    this.pageFirst = 0;
    this.pageOffset = 0;
    this.initData();
  }
}
