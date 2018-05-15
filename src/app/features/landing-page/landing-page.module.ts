import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';
import { ThemeModule } from '../../theme/theme.module';
import { LandingPageComponent } from '@belisada/features/landing-page/landing-page.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    LandingPageRoutingModule
  ],
  declarations: []
})
export class LandingPageModule { }
