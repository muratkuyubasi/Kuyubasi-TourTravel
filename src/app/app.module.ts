import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularCounterModule } from 'angular-input-counter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { MaintenanceComponent } from './feature-module/pages/maintenance/maintenance.component';


@NgModule({
  declarations: [
    AppComponent,
    MaintenanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularCounterModule,
    MatSliderModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
