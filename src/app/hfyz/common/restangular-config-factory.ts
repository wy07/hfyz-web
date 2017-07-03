import { Headers} from '@angular/http';
import {environment} from "../../../environments/environment";


export function RestangularConfigFactory (RestangularProvider, router, http, toastr) {
  // RestangularProvider.setBaseUrl(AppConfig.baseUrl);
  
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    params = Object.assign({}, params, {platform: 'web'});
    RestangularProvider.setBaseUrl(environment.grailsUrl);
  });
  RestangularProvider.setPlainByDefault(true);

  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    if (response.status === 401) {
      toastr.info('用户名、密码有误，请重新输入！');
      return false; // error handled
    }else if (response.status === 500||response.status === 400) {
      toastr.error(response.data.errors[0]);
    } else {
      toastr.error(response.status);
      console.log(`===RestangularConfigFactory=ErrorInterceptor=others=${response.status}`);
    }
    return true; // error not handled
  });
}
