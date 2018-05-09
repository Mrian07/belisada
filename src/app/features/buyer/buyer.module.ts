import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { ProfileComponent } from '@belisada/features/buyer/profile/profile.component';
import { ProfileEditComponent } from '@belisada/features/buyer/profile-edit/profile-edit.component';
import { CreateStoreComponent } from '@belisada/features/buyer/create-store/create-store.component';
import { SidebarLayoutComponent } from '@belisada/features/seller';
import { BuyerRoutingModule } from '@belisada/features/buyer/buyer-routing.module';
import { BuyerComponent } from '@belisada/features/buyer/buyer.component';
import { ThemeModule } from '../../theme/theme.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    BuyerRoutingModule,
  ],
  declarations: [
    BuyerComponent,
    ProfileComponent,
    ProfileEditComponent,
    CreateStoreComponent,
    SidebarLayoutComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuyerModule { }
