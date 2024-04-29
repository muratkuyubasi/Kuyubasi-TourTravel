import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    children: [
      {
        path: 'booking-payment/:id',
        loadChildren: () =>
          import('./booking-payment/booking-payment.module').then(
            (m) => m.BookingPaymentModule
          ),
      },
      {
        path: 'booking-list',
        loadChildren: () =>
          import('./booking-list/booking-list.module').then(
            (m) => m.BookingListModule
          ),
      },
      {
        path: 'invoice-details',
        loadChildren: () =>
          import('./invoice-details/invoice-details.module').then(
            (m) => m.InvoiceDetailsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
