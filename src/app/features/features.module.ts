import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from '@belisada/features/features-routing.module';
import { FeaturesComponent } from '.';
import { FaqComponent } from './faq/faq.component';
// import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ],
  declarations: [FeaturesComponent, FaqComponent,
    // InvoiceComponent
  ]
})
export class FeaturesModule { }
