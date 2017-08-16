import { CustomDirectiveModule } from './../common/custom-directive.module';
/**
 * Created by wangyan on 2017/7/27.
 */
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {
    DataTableModule,
    ButtonModule,
    PaginatorModule,
    DialogModule, CalendarModule,
} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OwnerIdentityComponent} from './owner-identity.component';
import {OwnerIdentityService} from './shared/owner-identity.service';
import {CompanyRegulationComponent} from './company-regulation/company-regulation.component';
import {CompanyRegulationService} from './company-regulation/company-regulation.service';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        OwnerIdentityComponent,
        CompanyRegulationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        DataTableModule,
        ButtonModule,
        PaginatorModule,
        DialogModule,
        CalendarModule,
        TooltipModule,
        CustomDirectiveModule
    ],
    exports: [],
    providers: [
        OwnerIdentityService,
        CompanyRegulationService
    ]
})
export class OwnerIdentityModule {
}
;
