import {DatePipe} from '@angular/common';
import {MapTabsBarComponent} from './shared/map-tab-bar/map-tabs-bar.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from './../common/common.module';
import {NgModule} from '@angular/core';
import {PanelModule, ButtonModule, DataTableModule, CalendarModule, DropdownModule,MultiSelectModule,ListboxModule} from 'primeng/primeng';
import {NullMapComponent} from './nullMap/null-map.component';
import {MapService} from './shared/map.service';
import {FormsModule} from '@angular/forms';
import {MapComponent} from './map/map.component';
import {TabsModule, AccordionModule} from 'ngx-bootstrap';

@NgModule({
    declarations: [
        MapComponent,
        NullMapComponent,
        MapTabsBarComponent
    ],
    imports: [
        BrowserModule,
        PanelModule,
        ButtonModule,
        CommonModule,
        FormsModule,
        DataTableModule,
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        CalendarModule,
        DropdownModule,
        MultiSelectModule,
        ListboxModule
    ],
    exports: [],
    providers: [
        MapService,
        DatePipe
    ]
})
export class MapModule {
}
;
