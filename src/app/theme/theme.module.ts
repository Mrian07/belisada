import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  MainLayoutComponent,
];

@NgModule({
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class ThemeModule {

}
