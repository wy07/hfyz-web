import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FreightWaybillComponent} from './freight-waybill/freight-waybill.component';
import {CalendarModule, DataTableModule, DialogModule, DropdownModule, PaginatorModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {FreightWaybillService} from './freight-waybill/freight-waybill.service';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule,
        DataTableModule,
        PaginatorModule,
        FormsModule
    ],
    declarations: [FreightWaybillComponent],
    providers: [FreightWaybillService]
})
export class WaybillModule {
}
