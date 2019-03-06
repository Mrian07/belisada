import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from '@belisada/features/contact-us/contact-us.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [
  {
    path: '',
    component: ContactUsComponent,
    children : [
      {
        path: '',
        component: ContactFormComponent,
        data: {
          title: 'Contact Us'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
