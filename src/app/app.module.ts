import { Configuration } from './servers/config/configuration';
import { CategoryService } from './servers/service/category/category.service';
import { SuiModule } from 'ng2-semantic-ui';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RegisterComponenet } from './clients/pages/register/register.component';

import { FullLayoutComponent } from './clients/layouts/full-layout/full-layout.component';
import { SidebarComponent } from './clients/components/sidebar/sidebar.component';
import { LoginComponent } from './clients/pages/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponenet,
    FullLayoutComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    SuiModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    CategoryService,
    Configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
