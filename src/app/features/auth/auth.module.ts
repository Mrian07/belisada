import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import {
  AuthComponent, SigninComponent
} from '@belisada/features/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginReducer, SignUpBuyerReducer } from '@belisada/core/ngrx/reducers';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthEffects } from '@belisada/core/ngrx/effects';



@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
    // FormsModule,
    // ReactiveFormsModule,
    // AngularFontAwesomeModule,
    // StoreModule.forFeature('login', LoginReducer),
    // StoreModule.forFeature('signup', SignUpBuyerReducer),
    // EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    SigninComponent,
    AuthComponent
    // SignUpComponent,
    // SignUpActivationComponent,
    // ForgotPasswordComponent,
    // ResetPasswordComponent,
    // LandingPageComponent
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
