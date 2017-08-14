import {Component, Injector, OnInit} from '@angular/core';
import {TdLoadingService} from '@covalent/core';
import {StatisticService} from '../../shared/statistic.service';
import {LayoutComponent} from '../../../layout/main-tab/layout.component';
@Component({
  selector: 'app-dangerous-statistic',
  templateUrl: './dangerous-statistic.component.html',
  styleUrls: ['./dangerous-statistic.component.css']
})
export class DangerousStatisticComponent implements OnInit {
  dangerousStatisticList: any;
  max: number;
  total: number;
  currentPage: number;
  company: string;
  layoutComponent: any;
    constructor(
    private _statisticService: StatisticService
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
    this._statisticService.dangerousList(this.max, offset, this.company).subscribe(
      res => {
        this._loadingService.resolve();
        this.dangerousStatisticList = res.dangerousStatisticList;
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
  showOnline(travel) {
    const menu = { name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: { ownerName: travel.ownerName
                                                                                     , type: 'dangerous', status: 'online'}};
    this.layoutComponent.addTab(menu);
  }
  showOnlineing(travel) {
    const menu = { name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: { ownerName: travel.ownerName
                                                                                    , type: 'dangerous', status: 'onlineing'}};
    this.layoutComponent.addTab(menu);
  }
  showCrossCar(travel) {
    const menu = { name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: { ownerName: travel.ownerName
                                                                                     , type: 'dangerous', status: 'crossCar'}};
    this.layoutComponent.addTab(menu);
  }
  showWarning(travel) {
    const menu = { name: '车辆信息', icon: 'fa-car', code: 'carList', inputs: { ownerName: travel.ownerName
                                                                                     , type: 'dangerous', status: 'waring'}};
    this.layoutComponent.addTab(menu);
  }
  cancel() {
    this.company = '';
    this.initData();
  }
}
