import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from './../common/common.module';
import {RealTimeMapComponent} from './realTimeMap/real-time-map.component';
import {HistoryMapComponent} from './historyMap/history-map.component';
import {NgModule} from '@angular/core';
import {PanelModule, ButtonModule} from 'primeng/primeng';
import {NullMapComponent} from "./nullMap/null-map.component";
import {MapService} from "./shared/map.service";

@NgModule({
  declarations: [
    HistoryMapComponent,
    RealTimeMapComponent,
    NullMapComponent
  ],
  imports: [
    BrowserModule,
    PanelModule,
    ButtonModule,
    CommonModule
  ],
  exports:[
  ],
  providers: [
    MapService
  ]
})
export class MapModule {
}
;
