import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlackListComponent} from './black-list/black-list.component';
import {WhiteListComponent} from './white-list/white-list.component';
import {RosterService} from './shared/roster.service';
import {CalendarModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule
  ],
  declarations: [
    BlackListComponent,
    WhiteListComponent
  ],
  providers: [
    RosterService
  ]
})
export class RosterModule {
}
