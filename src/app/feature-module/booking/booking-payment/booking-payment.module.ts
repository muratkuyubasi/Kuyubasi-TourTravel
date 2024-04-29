import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingPaymentRoutingModule } from './booking-payment-routing.module';
import { BookingPaymentComponent } from './booking-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookingPaymentComponent
  ],
  imports: [
    CommonModule,
    BookingPaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BookingPaymentModule { }
