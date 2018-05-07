import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CityReducer, ProvinceReducer } from '@belisada/core/ngrx/reducers';
import { StoreEffects } from '@belisada/core/ngrx/effects';



@NgModule({
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    StoreModule.forFeature('city', CityReducer),
    StoreModule.forFeature('province', ProvinceReducer),
    EffectsModule.forFeature([StoreEffects]),
  ],
  declarations: [HomeComponent]
})
export class LandingPageModule { }
