import { AuthenticationService } from './core/services/authentication/authentication.service';
import { Interceptor } from './core/services/interceptor/interceptor.service';
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
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { SigninComponent } from './components/signin/signin.component';
import { UserService } from './core/services/user/user.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Configuration } from './core/config/configuration';
import { SignUpActivationComponent } from './components/sign-up-activation/sign-up-activation.component';

import { SubscribeService } from './core/services/subscribe/subscribe.service';
import { StoreComponent } from './components/seller/store/store.component';
import { OnlyLoggedInUsersGuard } from './core/services/authentication/authguard';
import { Page404Component } from './components/page-404/page-404.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        StoreComponent,
        Page404Component,
        MaintenanceComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule
    ],
    providers: [
        Configuration,
        UserService,
        SubscribeService,
        AuthenticationService,
        OnlyLoggedInUsersGuard,
        {
        provide: RECAPTCHA_SETTINGS,
        useValue: {
            siteKey: '6Ld2TUwUAAAAAFo9u34dxrn7ocWjqRa42mr2kWJ1',
        } as RecaptchaSettings,
        },
        { provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
        },
        RecaptchaLoaderService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
