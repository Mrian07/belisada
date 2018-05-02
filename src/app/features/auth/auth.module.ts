import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {
  AuthComponent, SigninComponent, SignUpComponent,
  SignUpActivationComponent, ForgotPasswordComponent,
  ResetPasswordComponent
} from '@belisada/features/auth';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [
    SigninComponent,
    SignUpComponent,
    SignUpActivationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule { }
