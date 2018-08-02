import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { ProfileComponent } from '@belisada/features/buyer/profile/profile.component';
import { ProfileEditComponent } from '@belisada/features/buyer/profile-edit/profile-edit.component';
import { CreateStoreComponent } from '@belisada/features/buyer/create-store/create-store.component';
import { BuyerRoutingModule } from '@belisada/features/buyer/buyer-routing.module';
import { BuyerComponent } from '@belisada/features/buyer/buyer.component';
import { ThemeModule } from '../../theme/theme.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ADirective } from '@belisada/shared/directives';
import { OrderComponent } from './order/order.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    BuyerRoutingModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    BuyerComponent,
    ProfileComponent,
    ProfileEditComponent,
    CreateStoreComponent,
    ADirective,
    OrderComponent,
    OrderStatusComponent,
    OrderHistoryComponent,
    ProfileInformationComponent,
    ShippingAddressComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuyerModule { }
