import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModuleComponent } from './feature-module.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureModuleComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'booking',
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingModule),
          
      },
      {
        path: 'listings',
        loadChildren: () =>
          import('./listings/listings.module').then((m) => m.ListingsModule),
          
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
          
      },
      {
        path: 'error',
        loadChildren: () =>
          import('./error/error.module').then((m) => m.ErrorModule),
          
      },
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
        
      },
      {
        path:'**',
        redirectTo:'home',
        pathMatch:'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureModuleRoutingModule {}
