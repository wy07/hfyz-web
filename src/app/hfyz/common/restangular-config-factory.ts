import { TdLoadingService } from '@covalent/core';
import { Headers } from '@angular/http';
import { environment } from '../../../environments/environment';


export function RestangularConfigFactory(RestangularProvider, router, http, toastr, injector) {
    const refreshAccesstoken = function () {
        const username = sessionStorage.getItem('username');
        const password = sessionStorage.getItem('password');
        if (username && password) {
            return http.post(environment.gatewayServer + '/login'
                , { username: username, password: password })
                .map(res => res.json());
        } else {
            console.log('数据不完善');
            router.navigate(['/login']);
        }
    };

    const loadingResolve = function () {
        const loadingService = injector.get(TdLoadingService)
        loadingService.resolve();
    }

    // RestangularProvider.setBaseUrl(AppConfig.baseUrl);
    RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
        console.log(`addFullRequestInterceptor======path:${path},params:${JSON.stringify(params)},
    element:${JSON.stringify(element)},operation:${JSON.stringify(operation)},url:${JSON.stringify(url)}`);
        params = Object.assign({}, params, { platform: 'web' });
        RestangularProvider.setBaseUrl(environment.gatewayServer);
        const token = sessionStorage.getItem('token');
        if (path !== 'login') {
            headers['Authorization'] = 'Bearer ' + token;
        }
    });
    RestangularProvider.setPlainByDefault(true);

    RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
        if (response.status === 401) {
            refreshAccesstoken()
                .switchMap(refreshAccesstokenResponse => {
                    delete response.request['headers'];
                    const header = new Headers();
                    header.set('Authorization', 'Bearer ' + refreshAccesstokenResponse.token);
                    response.request.headers = header;
                    sessionStorage.setItem('token', refreshAccesstokenResponse.token);
                    return response.repeatRequest(response.request);
                })
                .subscribe(
                res => responseHandler(res),
                err => {
                    router.navigate(['/login']);
                }
                );
            return false; // error handled
        } else if (response.status === 500 || response.status === 400) {
            if (response.data.errors) {
                loadingResolve();
                console.log(response.data.errors[0]);
                toastr.error(response.data.errors[0]);
            }
        } else if (response.status === 403) {
            if (response.data.errors) {
                loadingResolve();
                console.log(response.data.errors[0]);
                toastr.error(response.data.errors[0]);
            }
        } else {
            loadingResolve();
            toastr.error(response.status);
            console.log(`===RestangularConfigFactory=ErrorInterceptor=others=${response.status}`);
        }
        return true; // error not handled
    });
}
