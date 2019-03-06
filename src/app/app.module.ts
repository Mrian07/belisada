import { InvoiceComponent } from './features/invoice/invoice.component';
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { APP_BASE_HREF, PathLocationStrategy, LocationStrategy, CurrencyPipe, AsyncPipe } from '@angular/common';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreEffects } from '@belisada/core/ngrx/effects';

import { ThemeModule } from './theme/theme.module';
import { LandingPageComponent } from '@belisada/features/landing-page/landing-page.component';
import { HttpTokenInterceptor } from '@belisada/core/interceptors';
import { StorageService, LocalStorageServie } from '@belisada/core/services/local-storage/storage.service';

import { CountdownTimerModule } from 'ngx-countdown-timer';
import 'angular2-navigate-with-data';
import {SlideshowModule} from 'ng-simple-slideshow';
import { EtalaseTokoComponent } from '@belisada/features/buyer/store/etalase-toko/etalase-toko.component';
import { FaqComponent } from './features/faq/faq.component';
import { ContactUsComponent } from './features/contact-us/contact-us.component';

// !font-awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// !angular2 fire
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireMessagingModule } from 'angularfire2/messaging';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AddressEffect } from './shared/store/effects/address.effect';
import { reducers } from './shared/store';
import { ShippingMethodEffects } from './shared/store/effects/shipping-method.effect';
import { ProductsEffects } from './shared/store/effects/products.effect';

import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { BsPopoverTriggerComponent } from './features/landing-page/home/bs-popover-trigger.component';
import { ChatComponent } from './features/chat/chat.component';

import {  NgxEmojiPickerModule  } from 'ngx-emoji-picker';

import { FileHelpersModule } from 'ngx-file-helpers';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { CarouselComponent } from './features/landing-page/carousel/carousel.component';
import { MessagingService } from './shared/messaging.service';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

registerLocaleData(localeId, 'id');

library.add(fas, far, fab);

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    MaintenanceComponent,
    LandingPageComponent,
    HomeComponent,
    FaqComponent,
    InvoiceComponent,
    EtalaseTokoComponent,
    BsPopoverTriggerComponent,
    ChatComponent,
    CarouselComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    SlideshowModule,
    ThemeModule,
    FormsModule,
    NgxEmojiPickerModule.forRoot(),
    FileHelpersModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxHmCarouselModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    StoreModule.forRoot(reducers),
    CountdownTimerModule.forRoot(),
    EffectsModule.forRoot([StoreEffects, ProductsEffects, AddressEffect, ShippingMethodEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: LOCALE_ID, useValue: 'id' },
    { provide: StorageService, useClass: LocalStorageServie },
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    MessagingService,
    AsyncPipe,

    CurrencyPipe
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
