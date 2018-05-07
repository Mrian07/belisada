import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from '@belisada/features/features-routing.module';
import { FeaturesComponent } from '.';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    HomeComponent,
  ],
  declarations: [FeaturesComponent]
})
export class FeaturesModule { }
