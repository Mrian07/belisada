import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaLoaderService } from 'ng-recaptcha';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
// import { FooterComponent } from './components/layout/footer/footer.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserService } from './core/services/user/user.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { Configuration } from './core/config/configuration';
import { SignUpVerificationComponent } from './components/sign-up-verification/sign-up-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpVerificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    // FormsModule,
    SharedModule,
    // ReactiveFormsModule,
  ],
  providers: [
    // fakeBackendProvider,
    // AlertService,
    Configuration,
    UserService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ld2TUwUAAAAAFo9u34dxrn7ocWjqRa42mr2kWJ1',
      } as RecaptchaSettings,
    },
    RecaptchaLoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
