import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent, pathMatch: 'full'},
    { path: 'about-us', component: AboutUsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
