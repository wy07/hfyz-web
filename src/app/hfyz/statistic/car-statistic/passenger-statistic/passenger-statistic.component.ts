import { Component, Injector, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { StatisticService } from '../../shared/statistic.service';
import { LayoutComponent } from '../../../layout/main-tab/layout.component';
@Component({
  selector: 'app-passenger-statistic',
  templateUrl: './passenger-statistic.component.html',
  styleUrls: ['./passenger-statistic.component.css']
})
export class PassengerStatisticComponent implements OnInit {
  pageMax: number;
  pageTotal: number;
  pageFirst: number;
  pageOffset: number;

  passengerStatisticList: any;
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
    this._statisticService.passengerList(this.pageMax, this.pageFirst, this.company).subscribe(
      res => {
        this._loadingService.resolve();
        this.passengerStatisticList = res.passengerStatisticList;
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
  showOnline(passenger) {
    const menu = {
      name: '车辆信息', icon: 'fa-bus', code: 'carList', inputs: {
        ownerName: passenger.ownerName
        , type: 'passenger', status: 'online'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  showOnlineing(passenger) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: passenger.ownerName
        , type: 'passenger', status: 'onlineing'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  showCrossCar(passenger) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: passenger.ownerName
        , type: 'passenger', status: 'crossCar'
      }
    };
    this.layoutComponent.addTab(menu);
  }
  showWarning(passenger) {
    const menu = {
      name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: {
        ownerName: passenger.ownerName
        , type: 'passenger', status: 'waring'
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
