import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModule } from './material.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CountUpModule } from 'ngx-countup';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModule,
    NgxSliderModule,
    CountUpModule,
    CarouselModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    SlickCarouselModule,
    LightboxModule
  ],
  exports: [
    CommonModule,
    materialModule,
    NgxSliderModule,
    CountUpModule,
    CarouselModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    SlickCarouselModule,
    LightboxModule
  ]
})
export class SharedModule { }
