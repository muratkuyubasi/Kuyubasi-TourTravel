import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingsRoutingModule } from './listings-routing.module';
import { ListingsComponent } from './listings.component';


@NgModule({
  declarations: [
    ListingsComponent
  ],
  imports: [
    CommonModule,
    ListingsRoutingModule
  ]
})
export class ListingsModule { }
