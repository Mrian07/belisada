import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerRoutingModule } from './seller-routing.module';
import { ProfileSellerComponent, StoreComponent } from '@belisada/features/seller';
import { SellerComponent } from '@belisada/features/seller/seller.component';
import { ThemeModule } from '../../theme/theme.module';
import { AddProductComponent } from '@belisada/features/seller/add-product/add-product.component';

@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SellerComponent,
    StoreComponent,
    ProfileSellerComponent,
    AddProductComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SellerModule { }

