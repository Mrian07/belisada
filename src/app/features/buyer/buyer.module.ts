import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { LayoutBuyerComponent } from '@belisada/features/buyer/layout-buyer/layout-buyer.component';
import { ProfileComponent } from '@belisada/features/buyer/profile/profile.component';
import { ProfileEditComponent } from '@belisada/features/buyer/profile-edit/profile-edit.component';
import { CreateStoreComponent } from '@belisada/features/buyer/create-store/create-store.component';
import { SidebarLayoutComponent } from '@belisada/features/seller';
import { BuyerRoutingModule } from '@belisada/features/buyer/buyer-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    BuyerRoutingModule,
  ],
  declarations: [
    LayoutBuyerComponent,
    ProfileComponent,
    ProfileEditComponent,
    CreateStoreComponent,
    SidebarLayoutComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuyerModule { }
