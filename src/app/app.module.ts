import { ForgotPasswordService } from './core/service/forgotpassword/forgot-password.service';
import { SendForgotPasswordComponent } from './views/sellers/component/send-forgot-password/send-forgot-password.component';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from 'angular5-social-login';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaintenanceComponent } from './views/sellers/component/maintenance/maintenance.component';
import { PlainLayoutComponent } from './core/layout/plain-layout/plain-layout.component';
import { ActivationComponent } from './views/sellers/component/activation/activation.component';
import { ActivationLayoutComponent } from './core/layout/activation-layout/activation-layout.component';
import { Page404Component } from './views/sellers/component/page-404/page-404.component';
import { SharedModules } from './core/shared/shared.modules';
import { AuthModules } from './core/shared/auth.modules';
import { FrontModules } from './views/front/modules/front.modules';
import { ActivationService } from './core/service/activation/activation.service';
import { OnlyLoggedInUsersGuard } from './core/shared/authguard';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './core/shared/interceptor';
import { CategoryComponent } from './views/front/component/category/category.component';
import { TruncateModule } from 'ng2-truncate';
import { SeoService } from './core/service/seo.service';
import { SignUpComponent } from './views/front/component/sign-up/sign-up.component';
import { SignInComponent } from './views/front/component/sign-in/sign-in.component';
import { LostPasswordComponent } from './views/front/component/lost-password/lost-password.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('Your-Facebook-app-id')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('874374052364-t59q5b9psp1cpsn1b1t87aoogab6d072.apps.googleusercontent.com')
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    MaintenanceComponent,
    PlainLayoutComponent,
    ActivationComponent,
    SendForgotPasswordComponent,
    ActivationLayoutComponent,
    Page404Component,
    CategoryComponent,
    SignUpComponent,
    SignInComponent,
    LostPasswordComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    SharedModules,
    AuthModules,
    FrontModules,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
    }),
    TruncateModule
  ],
  providers: [
    ActivationService,
    SeoService,
    ForgotPasswordService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    OnlyLoggedInUsersGuard,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
