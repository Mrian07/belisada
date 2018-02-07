import { RepiewServiceService } from './../../../core/service/repiew/repiew-service.service';
import { TransactionListService } from './../../../core/service/transcations-list/transaction-list.service';
import { WishlistBuyerService } from './../../../core/service/wishlist-buyer/wishlist-buyer.service';
import { UpgradeService } from './../../../core/service/upgrade/upgrade.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarousel } from 'ngx-carousel/src/ngx-carousel/ngx-carousel.interface';
import { NgxCarouselModule } from 'ngx-carousel/src/ngx-carousel.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ImageZoomModule} from 'angular2-image-zoom';
import { TruncateModule } from 'ng2-truncate/dist/truncate.module';
import { EmailNewsLetterService } from './../../../core/service/email-news-letter/email-news-letter.service';
import { ShippingAddressService } from './../../../core/service/shipping-address/shipping-address.service';
import { BilingAddressService } from './../../../core/service/billing-address/biling-address.service';
import { SidebarBuyerComponent } from './../component/buyer-dashboard/sidebar-buyer/sidebar-buyer.component';
import { SearchService } from './../../../core/service/search/search.service';
import { ProductDetailService } from './../../../core/service/product-detail/product-detail.service';
import { FrontLayoutComponent } from '../../../core/layout/front-layout/front-layout.component';
import { HomeComponent } from '../component/home/home.component';
import { FrontHeaderComponent } from '../component/front-header/front-header.component';
import { FrontNavComponent } from '../component/front-nav/front-nav.component';
import { FrontSlideShowComponent } from '../component/front-slide-show/front-slide-show.component';
import { FrontGridCarouselComponent } from '../component/front-grid-carousel/front-grid-carousel.component';
import { FrontFooterComponent } from '../component/front-footer/front-footer.component';
import { ProductDetailComponent } from '../component/product-detail/product-detail.component';
import { ProductSearchComponent } from '../component/product-search/product-search.component';
import { SharedModules } from '../../../core/shared/shared.modules';
import { HomeService } from '../../../core/service/home/home.service';
import { ShoppingCartService } from '../../../core/service/shopping-cart/shopping-cart.service';
import { ProductService } from '../../../core/service/product/product.service';
import { BuyerDashboardComponent } from '../component/buyer-dashboard/buyer-dashboard.component';
import { HomeReducer, DetailReducer, ListReducer, FilterReducer, CategoryReducer, PaymentMethodReducer } from '../../../store/reducers';
import { HomeEffects } from '../../../store/effects/front';
import { ShipingAddressComponent } from '../component/buyer-dashboard/shiping-address/shiping-address.component';
import { BillingAddress } from '../../../core/model/billing-address';
import { InfoComponent } from '../component/info/info.component';
import { ChattingFrontComponent } from '../../sellers/component/chatting/chatting-front.component';
import { PaymentMethodService } from '../../../core/service/payment-method/payment-method.service';
import { FreightRateService } from '../../../core/service/freight-rate/freight-rate.service';
import { CaraBerbelanjaComponent } from '../component/cara-berbelanja/cara-berbelanja.component';
import { CheckoutService } from '../../../core/service/checkout/checkout.service';
import { EmailSendService } from '../../../core/service/email-send/email-send.service';
import { AsapComponent } from '../component/asap/asap.component';
import { ProductTerbaruComponent } from '../component/product-terbaru/product-terbaru.component';
import { FrontNavMobileComponent } from './../component/front-nav-mobile/front-nav-mobile.component';

@NgModule({
  declarations: [
    FrontLayoutComponent,
    HomeComponent,
    FrontHeaderComponent,
    FrontNavComponent,
    FrontSlideShowComponent,
    FrontGridCarouselComponent,
    FrontFooterComponent,
    ProductDetailComponent,
    InfoComponent,
    ShipingAddressComponent,
    BuyerDashboardComponent,
    SidebarBuyerComponent,
    ProductSearchComponent,
    AsapComponent,
    CaraBerbelanjaComponent,
    ProductTerbaruComponent,
    FrontNavMobileComponent,
  ],
  imports: [
    CommonModule,
    TruncateModule,
    NgxCarouselModule,
    RouterModule,
    FormsModule,
    SharedModules,
    StoreModule.forFeature('home', HomeReducer),
    StoreModule.forFeature('detail', DetailReducer),
    StoreModule.forFeature('list', ListReducer),
    StoreModule.forFeature('filter', FilterReducer),
    StoreModule.forFeature('category', CategoryReducer),
    StoreModule.forFeature('paymentMethod', PaymentMethodReducer),
    EffectsModule.forFeature([HomeEffects]),
    ImageZoomModule
  ],
  providers: [
    NgxCarousel,
    HomeService,
    SearchService,
    BilingAddressService,
    ShippingAddressService,
    ProductDetailService,
    ShoppingCartService,
    ProductService,
    PaymentMethodService,
    EmailNewsLetterService,
    FreightRateService,
    CheckoutService,
    EmailSendService,
    WishlistBuyerService,
    TransactionListService,
    FreightRateService,
    UpgradeService,
    RepiewServiceService
  ]
})
export class FrontModules { }
