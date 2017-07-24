import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
@Injectable()
export class ChangePwdService {
  constructor(public restangular: Restangular) {
  }
  changePwd(originPwd, newPwd) {
    return this.restangular.all('change-pwd').customPOST({originPwd: originPwd, newPwd: newPwd});
  }
}
