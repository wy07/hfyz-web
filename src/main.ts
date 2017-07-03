import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {
  Response
} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
/*getHttp().get('config.json').toPromise()
  .then((res: Response) => {
    let conf = res.json();
    platformBrowserDynamic().bootstrapModule(getAppModule(conf));
  })
  .catch(error => { console.error(error) });*/
