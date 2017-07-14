import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from './../common/common.module';
import { RealTimeMapComponent } from './realTimeMap/real-time-map.component';
import { HistoryMapComponent } from './historyMap/history-map.component';
import { NgModule } from '@angular/core';
import { PanelModule, ButtonModule } from 'primeng/primeng';

@NgModule({
    declarations: [
        HistoryMapComponent,
        RealTimeMapComponent
    ],
    imports: [
        BrowserModule,
        PanelModule,
        ButtonModule,
        CommonModule
    ]
})
export class MapModule { };
