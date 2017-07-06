import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { AutoCompleteModule, ChartModule, PanelModule} from 'primeng/primeng';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        PanelModule,
        ChartModule,
    ],
    exports: [
    ],
    providers: [
    ]
})
export class HomeModule { };
