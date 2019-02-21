import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { ThemeModule } from '../../theme/theme.module';
import { LandingPageComponent } from '@belisada/features/landing-page/landing-page.component';
import { SharedModule } from '@belisada/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    LandingPageRoutingModule,
  ],
  declarations: []
})
export class LandingPageModule { }
