import { Component, OnInit, Injector } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { WarningService } from './shared/warning.service';
import { LayoutComponent } from '../layout/main-tab/layout.component';
import { TdLoadingService } from "@covalent/core";

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
  warningList: any[];
  warning: any;
  frameNo: string;
  carLicenseNo: string;
  displayDialog: boolean;
  formTitle: string;
  max: number;
  total: number;
  currentPage: number;
  offset: number;
  first: number;
  layoutComponent: any;

  constructor(private toastr: ToastsManager
    , private warningService: WarningService
    , private inj: Injector
    , private _loadingService: TdLoadingService) {
    this.displayDialog = false;
    this.warning = {};
    this.max = 10;
    this.first = 0;
    this.offset = 0;
    this.layoutComponent = this.inj.get(LayoutComponent);
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    this._loadingService.register();
    this.warningService.list(this.max, offset, this.frameNo, this.carLicenseNo).subscribe(
      res => {
        this._loadingService.resolve();
        this.warningList = res.warningList.warningList;
        this.total = res.warningList.total;
        this.offset = this.first;
      });
  }

  // 点击分页按钮
  paginate(event) {
    if (this.offset !== event.first) {
      this.initData(event.first);
    }
  }

  onReset() {
    this.frameNo = '';
    this.carLicenseNo = '';
    this.first = 0;
    this.offset = 0;
    this.initData();
  }

  onView(warning) {
    this.displayDialog = true;
    this.formTitle = '报警详情';
    this.preView(warning.id);
  }

  preView(id) {
    this.warningService.view(id).subscribe(
      res => {
        if (res.result === 'success') {
          this.warning = res.warning;
        } else {
          this.toastr.error('获取数据失败！');
        }
      }
    );
  }

  cancle() {
    this.displayDialog = false;
  }

  showRealTimeMap(item) {
    this.layoutComponent.toTab('realTimeMap'
    , { licenseNo: item.carLicenseNo, currentRealTimeAccordion: 'singleCar' });
  }

  onSearch() {
    this.first = 0;
    this.offset = 0;
    this.initData();
  }
}
