import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from '@belisada/features/features-routing.module';
import { FeaturesComponent } from '.';
import { DiskusiReviewComponent } from './diskusi-review/diskusi-review.component';
import { DiscussionReviewComponent } from './discussion-review/discussion-review.component';
// import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ],
  declarations: [FeaturesComponent, DiskusiReviewComponent, DiscussionReviewComponent,
    // InvoiceComponent
  ]
})
export class FeaturesModule { }
