import { FreightWaybillApproveService } from './freight-waybill-approve/sheard/freight-waybill-approve.service';
import { FreightWaybillApproveComponent } from './freight-waybill-approve/freight-waybill-approve.component';
import { EmergencyPlanComponent } from './emergency-plan/emergency-plan.component';
import { CustomDirectiveModule } from './../common/custom-directive.module';
import { FreightWaybillService } from './freight-waybill/sheard/freight-waybill.service';
import { PassLineBusinessBasicService } from './pass-line-business-basic/sheard/pass-line-business-basic.service';
import { PassLineBusinessBasicComponent } from './pass-line-business-basic/pass-line-business-basic.component';
import { PassLinePhysicalBasicService } from './pass-line-physical-basic/sheard/pass-line-physical-basic.service';
import { PassLinePhysicalBasicComponent } from './pass-line-physical-basic/pass-line-physical-basic.component';

import { FreightRouteService } from './freight-route/sheard/freight-route.service';
import { FreightRouteComponent } from './freight-route/freight-route.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FreightWaybillComponent } from './freight-waybill/freight-waybill.component';
import {
    CalendarModule, DataTableModule, DialogModule, DropdownModule, ListboxModule, PaginatorModule,
    TriStateCheckboxModule
} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { WuCitySelectModule } from 'ngx-select-city';
import { TooltipModule } from 'ngx-bootstrap';
import {EmergencyPlanService} from './emergency-plan/sheard/emergency-plan.service';
import {FreightStationComponent} from './freight-station/freight-station.component';
import {FreightStationService} from './freight-station/sheard/freight-station.service';

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
        DropdownModule,
        CustomDirectiveModule,
        ListboxModule
    ],
    declarations: [
        FreightWaybillComponent,
        FreightRouteComponent,
        PassLineBusinessBasicComponent,
        PassLinePhysicalBasicComponent,
        EmergencyPlanComponent,
        FreightWaybillApproveComponent,
        FreightStationComponent
    ],
    providers: [
        FreightWaybillService,
        FreightRouteService,
        PassLineBusinessBasicService,
        PassLinePhysicalBasicService,
        EmergencyPlanService,
        FreightWaybillApproveService,
        FreightStationService,
        DatePipe
    ]
})
export class WaybillModule {
}
