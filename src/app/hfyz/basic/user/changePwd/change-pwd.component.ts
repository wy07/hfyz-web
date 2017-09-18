import {Component} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {RegularService} from '../../../../hfyz/common/shared/regular.service';
import {ChangePwdService} from '../../../../hfyz/basic/user/changePwd/change-pwd.service';
@Component({
  selector: 'change-pwd',
  templateUrl: 'change-pwd.component.html',
  styleUrls: ['change-pwd.component.css']
})

export class ChangePwdComponent {
  originPwd: string;
  newPwd: string;
  affirmPwd: string;

  constructor(private _toastr: ToastsManager
    , private _regular: RegularService
    , private _changePwdService: ChangePwdService
   ) {
    this.originPwd = '';
    this.newPwd = '';
    this.affirmPwd = '';
  }

  validation() {
    if (this._regular.isBlank(this.originPwd)) {
      this._toastr.error('请输入旧密码！');
      return false;
    }
    if (this.originPwd === this.newPwd) {
      this._toastr.error('新密码不能与旧密码一致！');
      return false;
    }
    if (this._regular.isBlank(this.newPwd)) {
      this._toastr.error('请输入新密码！');
      return false;
    }
    if (!this._regular.isStrong(this.newPwd)) {
      this._toastr.error('新密码必须只包含数字和字母,并且长度大于6位！');
      return false;
    }
    if (this.newPwd !== this.affirmPwd) {
      this._toastr.error('两次输入的新密码不一致！');
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.validation()) {
      this._changePwdService.changePwd(this.originPwd, this.newPwd).subscribe(
        res => {
          this._toastr.success('密码修改成功！');
        }
      );
    }
  }
}
