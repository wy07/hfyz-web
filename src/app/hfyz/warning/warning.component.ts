import {Component, OnInit, Renderer} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {RegularService} from '../common/shared/regular.service';
import {WarningService} from './shared/warning.service';

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

  constructor(private renderer: Renderer
    , private toastr: ToastsManager
    , private warningService: WarningService) {
    this.displayDialog = false;
    this.warning = {};
    this.max = 10;
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    this.warningService.list(this.max, offset, this.frameNo, this.carLicenseNo).subscribe(
      res => {
        this.warningList = res.warningList.warningList;
        this.total = res.warningList.total;
      });
  }

  // 点击分页按钮
  paginate(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.initData(this.max * event.page);
    }
  }

  onReset() {
    this.frameNo = '';
    this.carLicenseNo = '';
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
        if (res.result == 'success') {
          this.warning = res.warning;
        } else {
          this.toastr.error('获取数据失败');
        }
      }
    );
  }

  cancle() {
    this.displayDialog = false;
  }
}
