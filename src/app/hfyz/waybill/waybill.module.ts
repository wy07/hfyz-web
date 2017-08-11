import { PassLineBusinessBasicService } from './pass-line-business-basic/sheard/pass-line-business-basic.service';
import { PassLineBusinessBasicComponent } from './pass-line-business-basic/pass-line-business-basic.component';
import { FreightRouteService } from './freight-route/sheard/freight-route.service';
import { FreightRouteComponent } from './freight-route/freight-route.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FreightWaybillComponent} from './freight-waybill/freight-waybill.component';
import {CalendarModule, DataTableModule, DialogModule, DropdownModule, PaginatorModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {FreightWaybillService} from './freight-waybill/freight-waybill.service';
import { WuCitySelectModule } from 'ngx-select-city';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule,
        DataTableModule,
        PaginatorModule,
        FormsModule,
        WuCitySelectModule,
        DialogModule
    ],
    declarations: [
        FreightWaybillComponent,
        FreightRouteComponent,
        PassLineBusinessBasicComponent
    ],
    providers: [
        FreightWaybillService,
        FreightRouteService,
        PassLineBusinessBasicService
    ]
})
export class WaybillModule {
}