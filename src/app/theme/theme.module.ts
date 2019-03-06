import { ModelsComponent } from '@belisada/shared/components/models/models.component';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideAuthComponent } from './components/side-auth/side-auth.component';
import { AuthLayoutComponent } from './layout/auth/auth-layout.component';
import { BuyerLayoutComponent } from './layout/buyer/buyer-layout.component';
import { SidebarBuyerComponent } from './components/sidebar-buyer/sidebar-buyer.component';
import { SidebarSellerComponent } from './components/sidebar-seller/sidebar-seller.component';
import { HeadingSellerComponent } from './components/heading-seller/heading-seller.component';
import { FilterPipe } from '@belisada/shared/pipes';
import { FieldErrorDisplayComponent } from '@belisada/features/buyer/create-store/field-error-display/field-error-display.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CategoryMenuComponent } from './components/header/category-menu.component';
import { AccountMenuComponent } from './components/header/account-menu.component';
import { ModalComponent } from '@belisada/shared/components/modal/modal.component';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const COMPONENTS = [
  ModalComponent,
  ModelsComponent,
  HeaderComponent,
  FooterComponent,
  SideAuthComponent,
  SidebarBuyerComponent,
  SidebarSellerComponent,
  HeadingSellerComponent,
  CategoryMenuComponent,
  AccountMenuComponent,

  MainLayoutComponent,
  AuthLayoutComponent,
  BuyerLayoutComponent,
  FieldErrorDisplayComponent,
];

const PIPES = [
  FilterPipe
];

library.add(fas, far, fab);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    CountdownTimerModule.forRoot()
  ],
  exports: [...PIPES, ...COMPONENTS],
  declarations: [...PIPES, ...COMPONENTS]
})
export class ThemeModule {

}
