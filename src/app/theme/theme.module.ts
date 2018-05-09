import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideAuthComponent } from './components/side-auth/side-auth.component';
import { AuthLayoutComponent } from './layout/auth/auth-layout.component';
import { BuyerLayoutComponent } from './layout/buyer/buyer-layout.component';
import { SidebarBuyerComponent } from './components/sidebar-buyer/sidebar-buyer.component';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SideAuthComponent,
  SidebarBuyerComponent,

  MainLayoutComponent,
  AuthLayoutComponent,
  BuyerLayoutComponent
];

@NgModule({
  imports: [
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class ThemeModule {

}
