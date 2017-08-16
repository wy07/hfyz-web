import { CustomDirectiveModule } from './../common/custom-directive.module';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HomeComponent} from './home.component';
import {AutoCompleteModule, ChartModule, PanelModule} from 'primeng/primeng';
import {ProgressbarModule} from 'ngx-bootstrap';
import {AngularEchartsModule} from 'ngx-echarts';
import {HomeService} from './home.service';
import {AutoHeightDirective} from '../common/directive/autoHeight.directive';


@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        PanelModule,
        ChartModule,
        AngularEchartsModule,
        ProgressbarModule.forRoot(),
        CustomDirectiveModule
    ],
    exports: [],
    providers: [
        HomeService
    ]
})
export class HomeModule {
}
;
