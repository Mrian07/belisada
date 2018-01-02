import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MaintenanceComponent,
    PlainLayoutComponent,
    ActivationComponent,
    ActivationLayoutComponent,
    Page404Component,
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
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
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
