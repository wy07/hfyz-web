import { CustomDirectiveModule } from './../common/custom-directive.module';
import { FreightWaybillService } from './freight-waybill/sheard/freight-waybill.service';
import { PassLineBusinessBasicService } from './pass-line-business-basic/sheard/pass-line-business-basic.service';
import { PassLineBusinessBasicComponent } from './pass-line-business-basic/pass-line-business-basic.component';
import { PassLinePhysicalBasicService } from './pass-line-physical-basic/sheard/pass-line-physical-basic.service';
import { PassLinePhysicalBasicComponent } from './pass-line-physical-basic/pass-line-physical-basic.component';

import { FreightRouteService } from './freight-route/sheard/freight-route.service';
import { FreightRouteComponent } from './freight-route/freight-route.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FreightWaybillComponent} from './freight-waybill/freight-waybill.component';
import {CalendarModule, DataTableModule, DialogModule, DropdownModule, PaginatorModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import { WuCitySelectModule } from 'ngx-select-city';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule,
        DataTableModule,
        PaginatorModule,
        FormsModule,
        WuCitySelectModule,
        DialogModule,
        TooltipModule,
        CustomDirectiveModule
    ],
    declarations: [
        FreightWaybillComponent,
        FreightRouteComponent,
        PassLineBusinessBasicComponent,
        PassLinePhysicalBasicComponent
    ],
    providers: [
        FreightWaybillService,
        FreightRouteService,
        PassLineBusinessBasicService,
        PassLinePhysicalBasicService
    ]
})
export class WaybillModule {
}
