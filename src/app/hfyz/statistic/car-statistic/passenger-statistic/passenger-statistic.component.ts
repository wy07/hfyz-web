import {Component, Injector, OnInit} from '@angular/core';
import {TdLoadingService} from '@covalent/core';
import {StatisticService} from '../../shared/statistic.service';
import {LayoutComponent} from '../../../layout/main-tab/layout.component';
@Component({
  selector: 'app-passenger-statistic',
  templateUrl: './passenger-statistic.component.html',
  styleUrls: ['./passenger-statistic.component.css']
})
export class PassengerStatisticComponent implements OnInit {
  passengerStatisticList: any;
  max: number;
  total: number;
  currentPage: number;
  company: string;
  layoutComponent: any;
    constructor(private _statisticService: StatisticService
    , private _loadingService: TdLoadingService
    , private inj: Injector
    ) {
    this.max = 10;
    this.company = '';
    this.layoutComponent = this.inj.get(LayoutComponent);
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    this._loadingService.register();
    this._statisticService.passengerList(this.max, offset, this.company).subscribe(
      res => {
        this._loadingService.resolve();
        this.passengerStatisticList = res.passengerStatisticList;
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
  showOnline(passenger) {
    const menu = { name: '车辆信息', icon: 'fa-bus', code: 'carList', inputs: { ownerName: passenger.ownerName
                                                                                     , type: 'passenger', status: 'online'}};
    this.layoutComponent.addTab(menu);
  }
  showOnlineing(passenger) {
    const menu = { name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: { ownerName: passenger.ownerName
                                                                                    , type: 'passenger', status: 'onlineing'}};
    this.layoutComponent.addTab(menu);
  }
  showCrossCar(passenger) {
    const menu = { name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: { ownerName: passenger.ownerName
                                                                                     , type: 'passenger', status: 'crossCar'}};
    this.layoutComponent.addTab(menu);
  }
  showWarning(passenger) {
    const menu = { name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: { ownerName: passenger.ownerName
                                                                                     , type: 'passenger', status: 'waring'}};
    this.layoutComponent.addTab(menu);
  }
  cancel() {
    this.company = '';
    this.initData();
  }
}
