import { Page404Component } from './clients/pages/page-404/page-404.component';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModules } from './clients/modules/shared.modules';
import { AuthModules } from './clients/modules/auth.modules';
import { FrontModules } from './clients/modules/front.modules';
import { NotFoundComponent } from './clients/pages/not-found/not-found.component';
import { OnlyLoggedInUsersGuard } from './clients/modules/authguard';
import { MaintenanceComponent } from './clients/pages/maintenance/maintenance.component';
import { PlainLayoutComponent } from './clients/layouts/plain-layout/plain-layout.component';
import { ActivationComponent } from './clients/pages/seller/activation/activation.component';
import { SendForgotPasswordComponent } from './clients/pages/seller/send-forgot-password/send-forgot-password.component';
import { ActivationService } from './servers/service/activation/activation.service';
import { ActivationLayoutComponent } from './clients/pages/account-layout/activation-layout/activation-layout.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/app.reducers';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MaintenanceComponent,
    PlainLayoutComponent,
    ActivationComponent,
    ActivationLayoutComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
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
    StoreModule.forRoot({ post: userReducer }),
  ],
  providers: [
    ActivationService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    OnlyLoggedInUsersGuard,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
