import {InfoCheckComponent} from './info-check/info-check.component';
import {InfoListComponent} from './info-list/info-list.component';
import {InfoPublishComponent} from './info-publish/info-publish.component';
import {NgModule} from '@angular/core';
import {DataTableModule, SharedModule, CalendarModule} from 'primeng/primeng';
import {TreeModule} from 'primeng/primeng';
@NgModule({
  declarations: [
    InfoPublishComponent,
    InfoListComponent,
    InfoCheckComponent
  ],
  imports: [
    DataTableModule
    , SharedModule
    , CalendarModule
    , TreeModule
  ],
  exports: [],
  providers: []
})
export class InfoManageModule {
}
;
