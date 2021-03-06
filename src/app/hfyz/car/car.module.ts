import { MapTabsBarComponent } from './shared/map-tab-bar/map-tabs-bar.component';
import { CarMonitorMapComponent } from './monitor-map/car-monitor-map.component';
import { CarHistoryMapComponent } from './history-map/car-history-map.component';
import { CustomDirectiveModule } from './../common/custom-directive.module';
import { CarRealTimeMapComponent } from './real-time-map/car-real-time-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    DataTableModule, ChartModule, PanelModule, DropdownModule, SplitButtonModule, PaginatorModule,
    CalendarModule, MultiSelectModule, ListboxModule, TabViewModule, SliderModule

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
        CarMonitorMapComponent,
        MapTabsBarComponent
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
        CalendarModule,
        TooltipModule,
        MultiSelectModule,
        ListboxModule,
        CustomDirectiveModule,
        CommonModule,
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        TabViewModule,
        SliderModule
    ],
    exports: [MapTabsBarComponent],
    providers: [
        CarService,
        DatePipe
    ]
})
export class CarModule {
};
