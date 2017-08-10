import {Component, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {TdLoadingService} from '@covalent/core';
import {StatisticService} from '../shared/statistic.service';
@Component({
  selector: 'app-check-statistic',
  templateUrl: './passenger-statistic.component.html',
  styleUrls: ['./passenger-statistic.component.css']
})
export class PassengerStatisticComponent implements OnInit {
  passengerStatisticList: any;
  max: number;
  total: number;
  currentPage: number;
  company: string;
    constructor(
     private _toastr: ToastsManager
    , private _statisticService: StatisticService
    , private _loadingService: TdLoadingService
    ) {
    this.max = 10;
    this.company = '';
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    if (!this.validation_search()) {
      return false;
    }
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
  validation_search() {
    return true;
  }

  cancel() {
    this.company = '';
    this.initData();
  }
}
