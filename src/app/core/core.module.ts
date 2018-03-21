import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { HomeComponent } from './../components/home/home.component';
import { LayoutComponent } from './../components/layout/layout.component';
import { throwIfAlreadyLoaded } from './module-import.guard';
// import { UserComponent } from './services/models/user/user';

import { CoreRoutingModule } from './core.routing';
import { SaniComponent } from './../components/sani/sani.component';
import { FooterComponent } from './../components/layout/footer/footer.component';
import { HeaderComponent } from './../components/layout/header/header.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { HomeComponent } from '../components/home/home.component';
import { SigninComponent } from '../components/signin/signin.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user/user.service';
import { RecaptchaModule, RecaptchaLoaderService, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    HomeComponent,
    SigninComponent,
    ForgotPasswordComponent,
    SaniComponent
    // HomeComponent
  ],
  // declarations: [],
  imports: [
    CommonModule,
    
  ],
  providers: [
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
