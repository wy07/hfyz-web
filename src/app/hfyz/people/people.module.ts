import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeopleListComponent} from './list/people-list.component';
import {PeopleService} from './shared/people.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  DataTableModule,
  DialogModule,
  ListboxModule,
  ButtonModule,
  DataGridModule,
  TreeModule,
  PaginatorModule,
  DropdownModule,
  TabViewModule
} from 'primeng/primeng';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    DataTableModule,
    DialogModule,
    ListboxModule,
    ButtonModule,
    DataGridModule,
    TreeModule,
    PaginatorModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TabViewModule,
    TooltipModule
  ],
  declarations: [
    PeopleListComponent
  ],
  providers: [
    PeopleService
  ]
})
export class PeopleModule {
}
