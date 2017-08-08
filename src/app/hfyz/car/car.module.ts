import {MapComponent} from './../map/map/map.component';
import {MapModule} from './../map/map.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
    DataTableModule, ChartModule, PanelModule, DropdownModule, SplitButtonModule, PaginatorModule,
    CalendarModule
} from 'primeng/primeng';
import {CarListComponent} from './list/car-list.component';
import {CarService} from './shared/car.service';

@NgModule({
    declarations: [
        CarListComponent
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
        CalendarModule
    ],
    exports: [],
    providers: [
        CarService
    ]
})
export class CarModule {
};
