import { WaybillRouteService } from './waybill-route/sheard/waybill-route.service';
import { WuCitySelectModule } from 'ngx-select-city';
import { WaybillRouteComponent } from './waybill-route/waybill-route.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackListComponent } from './black-list/black-list.component';
import { WhiteListComponent } from './white-list/white-list.component';
import { CalendarModule, DataTableModule, DialogModule, DropdownModule, PaginatorModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { BlackListService } from './black-list/black-list.service';
import { WhiteListService } from './white-list/white-list.service';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule,
        FormsModule,
        DataTableModule,
        PaginatorModule,
        DialogModule,
        DropdownModule,
        WuCitySelectModule
    ],
    declarations: [
        BlackListComponent,
        WhiteListComponent,
        WaybillRouteComponent
    ],
    providers: [
        BlackListService,
        WhiteListService,
        WaybillRouteService
    ]
})
export class RosterModule {
};
