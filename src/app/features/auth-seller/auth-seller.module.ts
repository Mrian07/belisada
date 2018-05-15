import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSellerRoutingModule } from './auth-seller-routing.module';
import { SignInSellerComponent, AuthSellerComponent } from '@belisada/features/auth-seller';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
  imports: [
    AngularFontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
    AuthSellerRoutingModule,
    ThemeModule
  ],
  declarations: [SignInSellerComponent, AuthSellerComponent]
})
export class AuthSellerModule { }
