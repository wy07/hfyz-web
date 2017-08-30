import { CarMonitorMapComponent } from './monitor-map/car-monitor-map.component';
import { CarHistoryMapComponent } from './history-map/car-history-map.component';
import { CustomDirectiveModule } from './../common/custom-directive.module';
import { CarRealTimeMapComponent } from './real-time-map/car-real-time-map.component';
import { MapComponent } from './../map/map/map.component';
import { MapModule } from './../map/map.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    DataTableModule, ChartModule, PanelModule, DropdownModule, SplitButtonModule, PaginatorModule,
<<<<<<< HEAD
    CalendarModule, MultiSelectModule, ListboxModule
=======
    CalendarModule, TabViewModule
>>>>>>> cdb9459d268a336e0b718a2a0c7d5ef3bd09c56c
} from 'primeng/primeng';

import { DatePipe, CommonModule } from '@angular/common';

import { CarListComponent } from './list/car-list.component';
import { CarService } from './shared/car.service';
import { TooltipModule, TabsModule, AccordionModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        CarListComponent,
        CarRealTimeMapComponent,
        CarHistoryMapComponent,
        CarMonitorMapComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        PanelModule,
        DataTableModule,
        ChartModule,
        DropdownModule,
        SplitButtonModule,
        PaginatorModule,
        MapModule,
        CalendarModule,
        TooltipModule,
<<<<<<< HEAD
        MultiSelectModule,
        ListboxModule,
        CustomDirectiveModule,
        CommonModule,
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        MapModule
=======
        TabViewModule
>>>>>>> cdb9459d268a336e0b718a2a0c7d5ef3bd09c56c
    ],
    exports: [],
    providers: [
        CarService,
        DatePipe
    ]
})
export class CarModule {
};
