import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingDetailsRoutingModule } from './listing-details-routing.module';
import { ListingDetailsComponent } from './listing-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularCounterModule } from 'angular-input-counter';
import { NgxInputCounterModule } from 'ngx-input-counter';
import { YouTubePlayerModule } from '@angular/youtube-player';



@NgModule({
  declarations: [
    ListingDetailsComponent
  ],
  imports: [
    CommonModule,
    ListingDetailsRoutingModule,
    SharedModule,
    AngularCounterModule,
    NgxInputCounterModule,
    YouTubePlayerModule
  ]
})
export class ListingDetailsModule { }
