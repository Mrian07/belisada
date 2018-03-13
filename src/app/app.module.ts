import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings} from 'ng-recaptcha';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ld2TUwUAAAAAFo9u34dxrn7ocWjqRa42mr2kWJ1',
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
