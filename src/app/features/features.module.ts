import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from '@belisada/features/features-routing.module';
import { FeaturesComponent } from '.';
import { ContactUsComponent } from './contact-us/contact-us.component';
// import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ],
  declarations: [FeaturesComponent, ContactUsComponent
    // InvoiceComponent
  ]
})
export class FeaturesModule { }
