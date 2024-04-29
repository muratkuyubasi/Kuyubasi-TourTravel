import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsComponent } from './listings.component';

const routes: Routes = [{ path: '', component: ListingsComponent },
 { path: 'listing-details/:id', loadChildren: () => import('./listing-details/listing-details.module').then(m => m.ListingDetailsModule) },
 { path: 'listing-grid', loadChildren: () => import('./listing-grid/listing-grid.module').then(m => m.ListingGridModule) },
 { path: 'listing-list', loadChildren: () => import('./listing-list/listing-list.module').then(m => m.ListingListModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
