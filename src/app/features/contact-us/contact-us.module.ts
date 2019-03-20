import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ThemeModule } from '../../theme/theme.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactUsComponent } from './contact-us.component';
import { Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: ContactUsComponent,
//   },
// ];

@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    CommonModule,
    ThemeModule,
    FontAwesomeModule,
  ],
  declarations: [ContactUsComponent, ContactFormComponent]
})
export class ContactUsModule { }
