import { ProductComponent } from './product.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { ThemeModule } from '../../theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EtalaseTokoComponent } from '@belisada/features/buyer/store/etalase-toko/etalase-toko.component';
import { AnotherOfferComponent } from './another-offer/another-offer.component';
import { ShareModule } from '@ngx-share/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductDetailV2Component } from './product-detail-v2/product-detail-v2.component';
import { ComponentsModule } from '@belisada/shared/components';
import { ProductsSandbox } from './products.sandbox';
import { ProductsResolver } from './products.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    ThemeModule,
    ComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ShareModule.forRoot()
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    AnotherOfferComponent,
    ProductDetailV2Component
  ],
  providers: [
    ProductsSandbox,
    ProductsResolver
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
