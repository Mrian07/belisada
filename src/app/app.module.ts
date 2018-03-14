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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
// import { FooterComponent } from './components/layout/footer/footer.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserServiceService } from './core/services/service/User/user-service.service';
import { fakeBackendProvider } from './core/services/cart/fixtures/fake-backend';
import { UserService } from './core/services/user/user.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AlertService } from './core/services/service/alert/alert.service';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    // FooterComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule,
    // RouterModule.forRoot({ path: '/oke', component: SignUpComponent}),
    RecaptchaFormsModule,
  ],
  providers: [
    UserServiceService,
    fakeBackendProvider,
    UserService,
    // AlertService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ld2TUwUAAAAAFo9u34dxrn7ocWjqRa42mr2kWJ1',
      } as RecaptchaSettings,
    },
    RecaptchaLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
