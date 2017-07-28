import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from './../common/common.module';
import { NgModule } from '@angular/core';
import { PanelModule, ButtonModule } from 'primeng/primeng';
import { NullMapComponent } from './nullMap/null-map.component';
import { MapService } from './shared/map.service';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    MapComponent,
    NullMapComponent
  ],
  imports: [
    BrowserModule,
    PanelModule,
    ButtonModule,
    CommonModule,
    FormsModule
  ],
  exports: [
  ],
  providers: [
    MapService
  ]
})
export class MapModule {
}
;
