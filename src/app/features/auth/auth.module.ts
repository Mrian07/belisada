import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthComponent, SigninComponent, SignUpComponent, SignUpActivationComponent, ForgotPasswordComponent, ResetPasswordComponent
} from '@belisada/features/auth';
import { ThemeModule } from '../../theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginReducer, SignUpBuyerReducer } from '@belisada/core/ngrx/reducers';
import { AuthEffects } from '@belisada/core/ngrx/effects';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

library.add(fas, far, fab);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    AuthRoutingModule,
    FontAwesomeModule,
    StoreModule.forFeature('login', LoginReducer),
    StoreModule.forFeature('signup', SignUpBuyerReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    AuthComponent,
    SigninComponent,
    SignUpComponent,
    SignUpActivationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TermsConditionsComponent,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
