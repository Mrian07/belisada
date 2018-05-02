import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaLoaderService } from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { CoreModule } from '@belisada/core/core.module';
import { Configuration } from '@belisada/core/config';

import { SharedModule } from '@belisada/shared/shared.module';

import { Page404Component, MaintenanceComponent } from '@belisada/features/error-pages';
import { APP_BASE_HREF, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelsComponent } from '@belisada/shared/components/models/models.component';
import { FieldErrorDisplayComponent } from '@belisada/features/buyer/create-store/field-error-display/field-error-display.component';
import { AuthComponent, AuthInfoComponent } from '@belisada/features/auth';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    MaintenanceComponent,

    // Should move into themes
    AuthComponent,
    AuthInfoComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ModelsComponent,
    FieldErrorDisplayComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: APP_BASE_HREF, useValue: '/' },
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
      // { provide: HTTP_INTERCEPTORS,
      // useClass: Interceptor,
      // multi: true
      // },
      // RecaptchaLoaderService,
      // FlagService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
