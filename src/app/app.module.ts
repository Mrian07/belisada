import { ForgotPasswordComponent } from './clients/pages/forgot-password/forgot-password.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// semantic-ui module
import { SuiModule } from 'ng2-semantic-ui';

// Component
import { AppComponent } from './app.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { AuthenticationLayoutComponent } from './clients/layouts/authentication-layout/authentication-layout.component';
import { FullLayoutComponent } from './clients/layouts/full-layout/full-layout.component';
import { LoginComponent } from './clients/pages/login/login.component';
import { RegistrationComponent } from './clients/pages/registration/registration.component';
import { SidebarComponent } from './clients/components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    AuthenticationLayoutComponent,
    LoginComponent,
    RegistrationComponent,
    SidebarComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    SuiModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
