import { InvoiceComponent } from './features/invoice/invoice.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaLoaderService } from 'ng-recaptcha';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { CoreModule } from '@belisada/core/core.module';
import { Configuration } from '@belisada/core/config';

import { SharedModule } from '@belisada/shared/shared.module';

import { Page404Component, MaintenanceComponent } from '@belisada/features/error-pages';
import { APP_BASE_HREF, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelsComponent } from '@belisada/shared/components/models/models.component';
import { StoreEffects } from '@belisada/core/ngrx/effects';
import { ProvinceReducer, CityReducer } from '@belisada/core/ngrx/reducers/store';
import { SigninComponent, SignUpComponent, SignUpActivationComponent,
  ForgotPasswordComponent, ResetPasswordComponent } from '@belisada/features/auth';


// import { AuthComponent } from '@belisada/features/auth';
import { ThemeModule } from './theme/theme.module';
import { LandingPageComponent } from '@belisada/features/landing-page/landing-page.component';
import { HttpTokenInterceptor } from '@belisada/core/interceptors';
import { StorageService, LocalStorageServie } from '@belisada/core/services/local-storage/storage.service';

import { CountdownTimerModule } from 'ngx-countdown-timer';
import { ADirective } from '@belisada/shared/directives';
import 'angular2-navigate-with-data';
import {SlideshowModule} from 'ng-simple-slideshow';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    MaintenanceComponent,
    LandingPageComponent,
    HomeComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    SharedModule,
    SlideshowModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    StoreModule.forRoot({}),
    CountdownTimerModule.forRoot(),
    EffectsModule.forRoot([StoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: StorageService, useClass: LocalStorageServie },
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
      // Configuration,
      // UserService,
      // SubscribeService,
      // AuthenticationService,
      // OnlyLoggedInUsersGuard,
      // {
      // provide: RECAPTCHA_SETTINGS,
      // useValue: {
      //     siteKey: '6Ld2TUwUAAAAAFo9u34dxrn7ocWjqRa42mr2kWJ1',
      // } as RecaptchaSettings,
      // },
      // RecaptchaLoaderService,
      // FlagService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
