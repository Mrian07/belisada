import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthComponent, SigninComponent, SignUpComponent, SignUpActivationComponent, ForgotPasswordComponent, ResetPasswordComponent
} from '@belisada/features/auth';
import { ThemeModule } from '../../theme/theme.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginReducer, SignUpBuyerReducer } from '@belisada/core/ngrx/reducers';
import { AuthEffects } from '@belisada/core/ngrx/effects';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    AuthRoutingModule,
    AngularFontAwesomeModule,
    StoreModule.forFeature('login', LoginReducer),
    StoreModule.forFeature('signup', SignUpBuyerReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    AuthComponent,
    SigninComponent,
    AuthComponent,
    SignUpComponent,
    SignUpActivationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
