import { InfoCheckComponent } from './info-check/info-check.component';
import { InfoListComponent } from './info-list/info-list.component';
import { InfoPublishComponent } from './info-publish/info-publish.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        InfoPublishComponent,
        InfoListComponent,
        InfoCheckComponent
    ],
    exports: [
    ],
    providers: [
    ]
})
export class InfoManageModule { };
