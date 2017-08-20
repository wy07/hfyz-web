import { Component, Injector, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { StatisticService } from '../../shared/statistic.service';
import { LayoutComponent } from '../../../layout/main-tab/layout.component';
@Component({
  selector: 'app-travel-statistic',
  templateUrl: './travel-statistic.component.html',
  styleUrls: ['./travel-statistic.component.css']
})
export class TravelStatisticComponent implements OnInit {
  pageMax: number;
  pageTotal: number;
  pageFirst: number;
  pageOffset: number;

  travelStatisticList: any;
  company: string;
  layoutComponent: any;
  constructor(private _statisticService: StatisticService
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

  initData() {
    this._loadingService.register();
    this._statisticService.travelList(this.pageMax, this.pageFirst, this.company).subscribe(
      res => {
        this._loadingService.resolve();
        this.travelStatisticList = res.travelStatisticList;
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
        , type: 'travel', status: 'online'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  showOnlineing(travel) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: travel.ownerName
        , type: 'travel', status: 'onlineing'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  showCrossCar(travel) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: travel.ownerName
        , type: 'travel', status: 'crossCar'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  showWarning(travel) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: travel.ownerName
        , type: 'travel', status: 'waring'
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
