import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from '@belisada/features/features-routing.module';
import { FeaturesComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ],
  declarations: [FeaturesComponent]
})
export class FeaturesModule { }
