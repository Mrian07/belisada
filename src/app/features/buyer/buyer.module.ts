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
import { ADirective } from '@belisada/shared/directives';
import { OrderComponent } from './order/order.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ConfirmationComponent } from '@belisada/features/buyer/confirmation/confirmation.component';
import { BantuanComponent } from './bantuan/bantuan.component';
import { BantuanKomplainComponent } from './bantuan-komplain/bantuan-komplain.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintProductComponent } from './complaint-product/complaint-product.component';

library.add(fas, far, fab);



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    BuyerRoutingModule,
    FontAwesomeModule,
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
    ConfirmationComponent,
    BantuanComponent,
    BantuanKomplainComponent,
    ComplaintComponent,
    ComplaintProductComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuyerModule { }
