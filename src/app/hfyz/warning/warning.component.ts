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
  // warningType: string;
  // warningTypes: any[];

  displayDialog: boolean;
  formTitle: string;

  constructor(private renderer: Renderer
    , private toastr: ToastsManager
    , private warningService: WarningService) {
    this.displayDialog = false;
    this.warning = {};
  }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.warningService.list().subscribe(
      res => {
        this.warningList = res.warningList;
      }
    );

  }
  onSearch() {
    this.warningService.search(this.frameNo, this.carLicenseNo).subscribe(
      res => {
        this.warningList = res.warningList;
      }
    );
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
