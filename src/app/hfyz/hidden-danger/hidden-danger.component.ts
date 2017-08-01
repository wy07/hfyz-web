import {Component, OnInit} from '@angular/core';
import {RegularService} from './../common/shared/regular.service';
import {ToastsManager} from 'ng2-toastr';
import {HiddenDangerService} from './shared/hidden-danger.service';

@Component({
  selector: 'app-hidden-danger',
  templateUrl: './hidden-danger.component.html',
  // styleUrls: ['./hidden-danger.component.css']
})
export class HiddenDangerComponent implements OnInit {
  // hiddenDangerList: any[];
  // hiddenDanger: any;
  // displayDialog: boolean;
  // hiddenDangerTitle: string;
  // isAdd: boolean;
  // max: number;
  // total: number;
  // currentPage: number;

  constructor(
    //  private toastr: ToastsManager
    // , private _hiddenDangerService: HiddenDangerService
    // , private regularService: RegularService
    ) {
    // this.displayDialog = false;
    // this.hiddenDanger = {};
    // this.clear();
    // this.max = 10;
  }

  ngOnInit() {
    this.initData();
  }

  initData(offset = 0) {
    // this._hiddenDangerService.list(this.max, offset).subscribe(
    //   res => {
    //     this.hiddenDangerList = res.hiddenDangerList.hiddenDangerList;
    //     this.total = res.hiddenDangerList.total;
    //   }
    // );
  }

  // paginate(event) {
  //   if (this.currentPage !== event.page) {
  //     this.currentPage = event.page;
  //     this.initData(this.max * event.page);
  //   }
  // }

  // onCreat() {
  //   this.clear();
  //   this.hiddenDangerTitle = '新增隐患';
  //   this.isAdd = true;
  //   this.displayDialog = true;
  // }
  //
  // onSave() {
  //   if (this.validate()) {
  //     this._hiddenDangerService.save(this.hiddenDanger).subscribe(
  //       res => {
  //         this.toastr.success('保存成功');
  //         this.initData();
  //         this.displayDialog = false;
  //       }
  //     );
  //   }
  // }
  //

  // onEdit(hiddenDanger) {
  //   this.clear();
  //   this.hiddenDangerTitle = `编辑隐患`;
  //   this.isAdd = false;
  //   this.displayDialog = true;
  //   this.preEdit(hiddenDanger.id);
  // }

  // preEdit(id) {
  //   this._hiddenDangerService.edit(id).subscribe(
  //     res => {
  //       if (res.result === 'success') {
  //         this.hiddenDanger = res.hiddenDanger;
  //       } else {
  //         this.toastr.error('获取数据失败');
  //       }
  //     }
  //   );
  // }
  //
  // update() {
  //   if (this.validate()) {
  //     this._hiddenDangerService.update(this.hiddenDanger.id, this.hiddenDanger).subscribe(
  //       res => {
  //         this.toastr.success('保存成功');
  //         this.initData();
  //         this.displayDialog = false;
  //       }
  //     );
  //   }
  // }
  //
  // cancle() {
  //   this.displayDialog = false;
  // }
  //
  // validate() {
    // if (this.regularService.isBlank(this.hiddenDanger.enterpirse)) {
    //   this.toastr.error('业户不能为空');
    //   return false;
    // }
//     return true;
//   }
//

//   onDelete(hiddenDanger) {
//     if (confirm('确认移除编号为："' + hiddenDanger.billNo + '"的隐患？')) {
//       this._hiddenDangerService.delete(hiddenDanger.id).subscribe(
//         res => {
//           this.initData();
//           this.toastr.info(`移除数据成功`);
//         }
//       );
//     }
//   }

//   clear() {
//     this.hiddenDanger = {};
//   }

}
