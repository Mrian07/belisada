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
import { OrderStatusPaidComponent } from './order-status-paid/order-status-paid.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ConfirmationComponent } from '@belisada/features/buyer/confirmation/confirmation.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintProductComponent } from './complaint-product/complaint-product.component';
import { ComplaintHistoryComponent } from './complaint-history/complaint-history.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RatingRequiredValidator } from './star-rating/rating-required.validator.directive';
import { DiscussionReviewComponent } from './discussion-review/discussion-review.component';
import { DiscussionProductComponent } from './discussion-product/discussion-product.component';
import { ReviewProductComponent } from './review-product/review-product.component';

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
    OrderStatusPaidComponent,
    ProfileInformationComponent,
    ShippingAddressComponent,
    ConfirmationComponent,
    ComplaintComponent,
    StarRatingComponent,
    RatingRequiredValidator,
    ComplaintProductComponent,
    ComplaintHistoryComponent,
    DiscussionReviewComponent,
    DiscussionProductComponent,
    ReviewProductComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuyerModule { }
