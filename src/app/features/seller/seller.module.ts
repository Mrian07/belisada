import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerRoutingModule } from './seller-routing.module';
import { LayoutSellerComponent, ProfileSellerComponent, StoreComponent,
  TopLayoutSellerComponent, SidebarLayoutComponent } from '@belisada/features/seller';




@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LayoutSellerComponent,
    StoreComponent,
    TopLayoutSellerComponent,
    SidebarLayoutComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SellerModule { }
