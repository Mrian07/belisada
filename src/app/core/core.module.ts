import { ProfileSellerComponent } from './../components/seller/profile-seller/profile-seller.component';
import { SignInSellerComponent } from './../components/sign-in-seller/sign-in-seller.component';
import { ProfileComponent } from './../components/buyer/profile/profile.component';
import { FieldErrorDisplayComponent } from './../components/buyer/create-store/field-error-display/field-error-display.component';
import { ProfileEditComponent } from './../components/buyer/profile-edit/profile-edit.component';
import { SidebarBuyerComponent } from './../components/buyer/layout-buyer/sidebar-buyer/sidebar-buyer.component';
import { LayoutBuyerComponent } from './../components/buyer/layout-buyer/layout-buyer.component';
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { HomeComponent } from './../components/home/home.component';
import { LayoutComponent } from './../components/layout/layout.component';
import { throwIfAlreadyLoaded } from './module-import.guard';
// import { UserComponent } from './services/models/user/user';

import { MyDatePickerModule } from 'mydatepicker';

import { CoreRoutingModule } from './core.routing';
import { SaniComponent } from './../components/sani/sani.component';
import { FooterComponent } from './../components/layout/footer/footer.component';
import { HeaderComponent } from './../components/layout/header/header.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { HomeComponent } from '../components/home/home.component';
import { SigninComponent } from '../components/signin/signin.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user/user.service';
import { RecaptchaModule, RecaptchaLoaderService, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './config/configuration';
import { JWTUtil } from './util/jwt.util';
import { AuthenticationComponent } from '../components/layout/authentication/authentication.component';
import { LeftComponent } from '../components/layout/authentication/left/left.component';
import { SignUpActivationComponent } from '../components/sign-up-activation/sign-up-activation.component';
import { LayoutSellerComponent } from '../components/seller/layout-seller/layout-seller.component';
import { SidebarLayoutComponent } from '../components/seller/layout-seller/sidebar-layout/sidebar-layout.component';
import { TopLayoutSellerComponent } from '../components/seller/layout-seller/top-layout-seller/top-layout-seller.component';
import { DateUtil } from './util/date.util';
import { CreateStoreComponent } from '../components/buyer/create-store/create-store.component';
import { StoreService } from './services/store/store.service';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';
import { ModelsComponent } from '../shared/components/models/models.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutBuyerComponent,
    HeaderComponent,
    FooterComponent,
    ResetPasswordComponent,
    SignUpComponent,
    HomeComponent,
    SigninComponent,
    TopLayoutSellerComponent,
    ForgotPasswordComponent,
    SaniComponent,
    SidebarBuyerComponent,
    SidebarLayoutComponent,
    LeftComponent,
    AuthenticationComponent,
    SignUpActivationComponent,
    ProfileEditComponent,
    LayoutSellerComponent,
    CreateStoreComponent,
    ClickOutsideDirective,
    FieldErrorDisplayComponent,
    ProfileComponent,
    ModelsComponent,
    SignInSellerComponent,
    ProfileSellerComponent
    // HomeComponent
  ],
  // declarations: [],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MyDatePickerModule,
  ],
  providers: [
    Configuration,
    JWTUtil,
    DateUtil,
    UserService,
    StoreService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ld2TUwUAAAAAFo9u34dxrn7ocWjqRa42mr2kWJ1',
      } as RecaptchaSettings,
    },
    RecaptchaLoaderService
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
