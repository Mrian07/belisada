import { ProductComponent } from './product.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { ThemeModule } from '../../theme/theme.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    ThemeModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
