import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { path: '', component: PagesComponent },
  {
    path: 'terms-condition',
    loadChildren: () =>
      import('./terms-condition/terms-condition.module').then(
        (m) => m.TermsConditionModule
      ),
  },
  {
    path: 'maintenance',
    loadChildren: () =>
      import('./maintenance/maintenance.module').then(
        (m) => m.MaintenanceModule
      ),
  },
  {
    path: 'coming-soon',
    loadChildren: () =>
      import('./coming-soon/coming-soon.module').then(
        (m) => m.ComingSoonModule
      ),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./contact-us/contact-us.module').then((m) => m.ContactUsModule),
  },
  {
    path: 'testimonial',
    loadChildren: () =>
      import('./testimonial/testimonial.module').then(
        (m) => m.TestimonialModule
      ),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./gallery/gallery.module').then((m) => m.GalleryModule),
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'pricing',
    loadChildren: () =>
      import('./pricing/pricing.module').then((m) => m.PricingModule),
  },
  {
    path: 'education',
    loadChildren: () =>
      import('./our-team/our-team.module').then((m) => m.OurTeamModule),
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
