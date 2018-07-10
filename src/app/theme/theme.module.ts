import { ModelsComponent } from '@belisada/shared/components/models/models.component';
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
import { SellerLayoutComponent } from './layout/seller/seller-layout.component';
import { SidebarSellerComponent } from './components/sidebar-seller/sidebar-seller.component';
import { HeadingSellerComponent } from './components/heading-seller/heading-seller.component';
import { FilterPipe } from '@belisada/shared/pipes';
import { FieldErrorDisplayComponent } from '@belisada/features/buyer/create-store/field-error-display/field-error-display.component';

const COMPONENTS = [
  ModelsComponent,
  HeaderComponent,
  FooterComponent,
  SideAuthComponent,
  SidebarBuyerComponent,
  SidebarSellerComponent,
  HeadingSellerComponent,

  MainLayoutComponent,
  AuthLayoutComponent,
  BuyerLayoutComponent,
  SellerLayoutComponent,
  FieldErrorDisplayComponent
];

const PIPES = [
  FilterPipe
];

@NgModule({
  imports: [
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [...PIPES, ...COMPONENTS],
  declarations: [...PIPES, ...COMPONENTS]
})
export class ThemeModule {

}
