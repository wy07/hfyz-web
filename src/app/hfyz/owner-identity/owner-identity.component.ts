import {Component, OnInit, Renderer} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {OwnerIdentityService} from './shared/owner-identity.service';

@Component({
  selector: 'app-owner-identity',
  templateUrl: './owner-identity.component.html',
  styleUrls: ['./owner-identity.component.css']
})
export class OwnerIdentityComponent implements OnInit {
  ownerList: any[];
  owner: any;
  ownerName: any
  companyCode: any
  displayDialog: boolean;
  formTitle: string;
  max: number;
  total: number;
  currentPage: number;

  constructor(private renderer: Renderer
    , private toastr: ToastsManager
    , private ownerIdentityService: OwnerIdentityService) {
    this.displayDialog = false;
    this.owner = {};
    this.clearForm();
    this.max = 10;
  }


  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    this.ownerIdentityService.list(this.max, offset, this.ownerName, this.companyCode).subscribe(
      res => {
        this.ownerList = res.ownerList.ownerList;
        this.total = res.ownerList.total;
      }
    );
  }

  onReset() {

  }

  onView(id) {
    this.displayDialog = true;
    this.formTitle = `企业详情`;
    this.ownerIdentityService.view(id).subscribe(
      res => {
        if (res.result == 'success') {
          this.owner = res.owner;
        } else {
          this.toastr.error('获取数据失败');
        }
      }
    );
  }

  paginate(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.initData(this.max * event.page);
    }
  }

  cancle() {
    this.displayDialog = false;
  }

  clearForm() {

  }
}
