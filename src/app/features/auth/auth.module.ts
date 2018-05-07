import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import {
  AuthComponent, SigninComponent, SignUpComponent,
  SignUpActivationComponent, ForgotPasswordComponent,
  ResetPasswordComponent
} from '@belisada/features/auth';
import { ThemeModule } from '../../theme/theme.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    AuthRoutingModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    AuthComponent,
    SigninComponent,
    SignUpComponent,
    SignUpActivationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule { }
