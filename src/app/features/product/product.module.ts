import { ProductComponent } from './product.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { ThemeModule } from '../../theme/theme.module';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { EtalaseTokoComponent } from '@belisada/features/buyer/store/etalase-toko/etalase-toko.component';
import { AnotherOfferComponent } from './another-offer/another-offer.component';
=======
import { ShareModule } from '@ngx-share/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
>>>>>>> 3226ff7dec0c9cb89e7441a3d8d45bccf998412b

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    ThemeModule,
    FontAwesomeModule,
    ShareModule.forRoot()
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    AnotherOfferComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
