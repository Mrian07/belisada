import { FlagService } from './core/service/flag.service';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF, PathLocationStrategy, registerLocaleData  } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import localeID from '@angular/common/locales/id';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from 'angular5-social-login';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaintenanceComponent } from './views/sellers/component/maintenance/maintenance.component';
import { ShippingComponent } from './views/front/component/shipping/shipping.component';
import { BillingAddress } from './core/model/billing-address';
import { DashboardBuyerComponent } from './views/buyer/component/dashboard-buyer/dashboard-buyer.component';
import { ForgotPasswordService } from './core/service/forgotpassword/forgot-password.service';
import { SendForgotPasswordComponent } from './views/sellers/component/send-forgot-password/send-forgot-password.component';
import { PlainLayoutComponent } from './core/layout/plain-layout/plain-layout.component';
import { ActivationComponent } from './views/sellers/component/activation/activation.component';
import { ActivationLayoutComponent } from './core/layout/activation-layout/activation-layout.component';
import { Page404Component } from './views/sellers/component/page-404/page-404.component';
import { SharedModules } from './core/shared/shared.modules';
import { AuthModules } from './core/shared/auth.modules';
import { FrontModules } from './views/front/modules/front.modules';
import { ActivationService } from './core/service/activation/activation.service';
import { OnlyLoggedInUsersGuard } from './core/shared/authguard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './core/shared/interceptor';
import { CategoryComponent } from './views/front/component/category/category.component';
import { TruncateModule } from 'ng2-truncate';
import { SeoService } from './core/service/seo.service';
import { SignUpComponent } from './views/front/component/sign-up/sign-up.component';
import { SignInComponent } from './views/front/component/sign-in/sign-in.component';
import { LostPasswordComponent } from './views/front/component/lost-password/lost-password.component';
// import { DashboardBuyerComponent } from './views/front/component/buyer/dashboard-buyer/dashboard-buyer.component';
import { BuyerLayoutComponent } from './core/layout/buyer-layout/buyer-layout.component';
import { HeaderBuyerComponent } from './views/buyer/component/header-buyer/header-buyer.component';
import { SidebarBuyerComponent } from './views/buyer/component/sidebar-buyer/sidebar-buyer.component';
import { BillingAddressComponent } from './views/buyer/component/billing-address/billing-address.component';
import { CartBuyerComponent } from './views/buyer/component/cart-buyer/cart-buyer.component';
import { ChangePasswordBuyerComponent } from './views/buyer/component/change-password-buyer/change-password-buyer.component';
import { CartComponent } from './views/front/component/cart/cart.component';
import { ShippingAddressComponent } from './views/buyer/component/shipping-address/shipping-address.component';
import { PaymentMethodComponent } from './views/front/component/payment-method/payment-method.component';
import { ConfirmOrderComponent } from './views/front/component/confirm-order/confirm-order.component';
import { FinihOrderComponent } from './views/front/component/finih-order/finih-order.component';
import { AddShippingComponent } from './views/front/component/add-shipping/add-shipping.component';
import { ProductTopBuyerComponent } from './views/buyer/component/product-top-buyer/product-top-buyer.component';
import { ProfileBuyerComponent } from './views/buyer/component/profile-buyer/profile-buyer.component';
import { WishlistBuyerComponent } from './views/buyer/component/wishlist-buyer/wishlist-buyer.component';
import { TransactionBuyerComponent } from './views/buyer/component/transaction-buyer/transaction-buyer.component';
import { OrderDetailBuyerComponent } from './views/buyer/component/order-detail-buyer/order-detail-buyer.component';
import { InboxBuyerComponent } from './views/buyer/component/inbox-buyer/inbox-buyer.component';
// import { CaraBerbelanjaComponent } from './views/front/component/cara-berbelanja/cara-berbelanja.component';
import { ConfirmationBuyerComponent } from './views/buyer/component/confirmation-buyer/confirmation-buyer.component';
import { AddBillingComponent } from './views/front/component/add-billing/add-billing.component';
import { AboutUsComponent } from './views/front/component/about-us/about-us.component';
import { CareerComponent } from './views/front/component/career/career.component';
import { TermsConditionsComponent } from './views/front/component/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './views/front/component/privacy-policy/privacy-policy.component';
import { CopyrightPolicyComponent } from './views/front/component/copyright-policy/copyright-policy.component';
import { FaqComponent } from './views/front/component/faq/faq.component';
import { HowOrderComponent } from './views/front/component/how-order/how-order.component';
import { ReturnCancelComponent } from './views/front/component/return-cancel/return-cancel.component';
import { WarrantyComponent } from './views/front/component/warranty/warranty.component';
import { ContactUsComponent } from './views/front/component/contact-us/contact-us.component';
import { AfterSalesServiceComponent } from './views/front/component/after-sales-service/after-sales-service.component';
import { CheckoutComponent } from './views/front/component/checkout/checkout.component';

import { TransactionsService } from './core/service/transactions/transactions';
import { TransactionsComponent } from './views/front/component/transactions/transactions.component';
import { AsapComponent } from './views/front/component/asap/asap.component';
import { CustomerServiceComponent } from './views/front/component/customer-service/customer-service.component';
import { LacakPesananComponent } from './views/front/component/lacak-pesanan/lacak-pesanan.component';
import { CustomerCareComponent } from './views/front/component/customer-care/customer-care.component';
import { DownloadAppComponent } from './views/front/component/download-app/download-app.component';
import { SellerProposeComponent } from './views/buyer/component/seller-propose/seller-propose.component';
import { SliderDepanComponent } from './views/front/component/slider-depan/slider-depan.component';
import { PsnLoginComponent } from './views/front/component/psn-login/psn-login.component';
import { SellerCenterComponent } from './views/front/component/seller-center/seller-center.component';
import { SidebarComponent } from './views/front/component/seller-center/sidebar/sidebar.component';
import { InboxComponent } from './views/front/component/seller-center/inbox/inbox.component';
import { KnpBelisadaComponent } from './views/front/component/seller-center/knp-belisada/knp-belisada.component';
import { BerjualanBelisadaComponent } from './views/front/component/seller-center/berjualan-belisada/berjualan-belisada.component';
import { CaraBerjualanComponent } from './views/front/component/seller-center/cara-berjualan/cara-berjualan.component';
import { AsapbyBelisComponent } from './views/front/component/seller-center/asapby-belis/asapby-belis.component';
import { HeaderdisellerComponent } from './views/front/component/seller-center/headerdiseller/headerdiseller.component';
import { EditShippingComponent } from './views/front/component/edit-shipping/edit-shipping.component';
import { EditBillingComponent } from './views/front/component/edit-billing/edit-billing.component';
import { FaqSellerCenterComponent } from './views/front/component/seller-center/faq-seller-center/faq-seller-center.component';
import { ChattingComponent } from './core/component/chatting/chatting.component';
import { ReviewBuyerComponent } from './views/buyer/component/review-buyer/review-buyer.component';
import { DalemReviewComponent } from './views/buyer/component/review-buyer/dalem-review/dalem-review.component';

import { MFrontLayoutComponent } from './core/layout/mobile/m-front-layout/m-front-layout.component';
import { MFrontHeaderComponent } from './views/mobile/front/component/m-front-header/m-front-header.component';
import { MFrontHomeComponent } from './views/mobile/front/component/m-front-home/m-front-home.component';
import { MFrontFooterComponent } from './views/mobile/front/component/m-front-footer/m-front-footer.component';
import { MFrontNavComponent } from './views/mobile/front/component/m-front-nav/m-front-nav.component';
import { MFrontSlideShowComponent } from './views/mobile/front/component/m-front-slide-show/m-front-slide-show.component';
import { MCategoryComponent } from './views/mobile/front/component/m-category/m-category.component';
import { MSignInComponent } from './views/mobile/front/component/m-sign-in/m-sign-in.component';
import { MSignUpComponent } from './views/mobile/front/component/m-sign-up/m-sign-up.component';
import { MDashboardBuyerComponent } from './views/mobile/buyer/component/m-dashboard-buyer/m-dashboard-buyer.component';
import { MBuyerLayoutComponent } from './core/layout/mobile/m-buyer-layout/m-buyer-layout.component';
import { MMenuBuyerComponent } from './views/mobile/buyer/component/m-menu-buyer/m-menu-buyer.component';
import { MProfileBuyerComponent } from './views/mobile/buyer/component/m-profile-buyer/m-profile-buyer.component';
import { MSellerLayoutComponent } from './core/layout/mobile/m-seller-layout/m-seller-layout.component';
import { MChangePasswordBuyerComponent } from './views/mobile/buyer/component/m-change-password-buyer/m-change-password-buyer.component';
import { MBillingAddressComponent } from './views/mobile/buyer/component/m-billing-address/m-billing-address.component';
import { MShippingAddressComponent } from './views/mobile/buyer/component/m-shipping-address/m-shipping-address.component';
import { MCartComponent } from './views/mobile/front/component/m-cart/m-cart.component';
import { MCheckoutComponent } from './views/mobile/front/component/m-checkout/m-checkout.component';
import { MFinishOrderComponent } from './views/mobile/front/component/m-finish-order/m-finish-order.component';

// import { RepiewComponent } from './core/service/repiew/repiew.component';
// registerLocaleData(localeID, 'id');
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('Your-Facebook-app-id')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('874374052364-t59q5b9psp1cpsn1b1t87aoogab6d072.apps.googleusercontent.com')
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    MaintenanceComponent,
    PlainLayoutComponent,
    ActivationComponent,
    SendForgotPasswordComponent,
    ActivationLayoutComponent,
    Page404Component,
    CategoryComponent,
    SignUpComponent,
    SignInComponent,
    LostPasswordComponent,
    DashboardBuyerComponent,
    BuyerLayoutComponent,
    HeaderBuyerComponent,
    SidebarBuyerComponent,
    BillingAddressComponent,
    CartBuyerComponent,
    ChangePasswordBuyerComponent,
    CartComponent,
    ShippingAddressComponent,
    // ShippingComponent,
    ShippingComponent,
    PaymentMethodComponent,
    ConfirmOrderComponent,
    FinihOrderComponent,
    AddShippingComponent,
    ProductTopBuyerComponent,
    ProfileBuyerComponent,
    WishlistBuyerComponent,
    TransactionBuyerComponent,
    OrderDetailBuyerComponent,
    InboxBuyerComponent,
    // CaraBerbelanjaComponent
    ConfirmationBuyerComponent,
    AddBillingComponent,
    AboutUsComponent,
    CareerComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    CopyrightPolicyComponent,
    FaqComponent,
    HowOrderComponent,
    ReturnCancelComponent,
    WarrantyComponent,
    ContactUsComponent,
    AfterSalesServiceComponent,
    CheckoutComponent,
    // ProductTerbaruComponent,
    TransactionsComponent,
    CustomerServiceComponent,
    LacakPesananComponent,
    CustomerCareComponent,
    DownloadAppComponent,
    SellerProposeComponent,
    SliderDepanComponent,
    PsnLoginComponent,
    SellerCenterComponent,
    SidebarComponent,
    InboxComponent,
    KnpBelisadaComponent,
    BerjualanBelisadaComponent,
    CaraBerjualanComponent,
    AsapbyBelisComponent,
    HeaderdisellerComponent,
    EditShippingComponent,
    EditBillingComponent,
    FaqSellerCenterComponent,
    ChattingComponent,
    FaqSellerCenterComponent,
    ReviewBuyerComponent,
    DalemReviewComponent,

    MFrontLayoutComponent,
    MFrontHeaderComponent,
    MFrontHomeComponent,
    MFrontFooterComponent,
    MFrontNavComponent,
    MFrontSlideShowComponent,
    MCategoryComponent,
    MSignInComponent,
    MSignUpComponent,
    MDashboardBuyerComponent,
    MBuyerLayoutComponent,
    MMenuBuyerComponent,
    MProfileBuyerComponent,
    MSellerLayoutComponent,
    MChangePasswordBuyerComponent,
    MBillingAddressComponent,
    MShippingAddressComponent,
    MCartComponent,
    MCheckoutComponent,
    MFinishOrderComponent


    // WishlistComponent,
    // AsapComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', {
    //   enabled: environment.production,
    // }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    SharedModules,
    AuthModules,
    FrontModules,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    TruncateModule
  ],
  providers: [
    ActivationService,
    SeoService,
    ForgotPasswordService,
    FlagService,
    TransactionsService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    OnlyLoggedInUsersGuard,
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
