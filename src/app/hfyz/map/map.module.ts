import { CustomDirectiveModule } from './../common/custom-directive.module';
import { DatePipe, CommonModule } from '@angular/common';
import {MapTabsBarComponent} from './shared/map-tab-bar/map-tabs-bar.component';
import {BrowserModule} from '@angular/platform-browser';
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
        FormsModule,
        DataTableModule,
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        CalendarModule,
        DropdownModule,
        MultiSelectModule,
        ListboxModule,
        CustomDirectiveModule,
        CommonModule
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
