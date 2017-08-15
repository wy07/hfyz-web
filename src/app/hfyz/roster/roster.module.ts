import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackListComponent } from './black-list/black-list.component';
import { WhiteListComponent } from './white-list/white-list.component';
import { CalendarModule, DataTableModule, DialogModule, DropdownModule, PaginatorModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { BlackListService } from './black-list/black-list.service';
import { WhiteListService } from './white-list/white-list.service';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule,
        FormsModule,
        DataTableModule,
        PaginatorModule,
        DialogModule,
        DropdownModule,
        TooltipModule
    ],
    declarations: [
        BlackListComponent,
        WhiteListComponent,
    ],
    providers: [
        BlackListService,
        WhiteListService,
    ]
})
export class RosterModule {
};
