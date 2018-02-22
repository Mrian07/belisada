import { MNewSellerComponent } from './views/mobile/seller/component/m-new-seller/m-new-seller.component';
import { MSellerProposeComponent } from './views/mobile/buyer/component/m-seller-propose/m-seller-propose.component';
import { MAfterSalesServiceComponent } from './views/mobile/front/component/m-after-sales-service/m-after-sales-service.component';
import { MContactUsComponent } from './views/mobile/front/component/m-contact-us/m-contact-us.component';
import { MAddProductsComponent } from './views/mobile/seller/component/m-add-products/m-add-products.component';
import { MProductComponent } from './views/mobile/seller/component/m-product/m-product.component';
import { MProductListComponent } from './views/mobile/seller/component/m-product-list/m-product-list.component';
import { MCourierComponent } from './views/mobile/seller/component/m-courier/m-courier.component';
import { MSignUpSuccessComponent } from './views/mobile/front/component/m-sign-up-success/m-sign-up-success.component';
import { MLostPasswordComponent } from './views/mobile/front/component/m-lost-password/m-lost-password.component';
import { MAvatarSellerComponent } from './views/mobile/seller/component/m-avatar-seller/m-avatar-seller.component';
import { MAvatarBuyerComponent } from './views/mobile/buyer/component/m-avatar-buyer/m-avatar-buyer.component';
import { MTokoComponent } from './views/mobile/seller/component/m-toko/m-toko.component';
import { MRekeningComponent } from './views/mobile/seller/component/m-rekening/m-rekening.component';
import { MChangePasswordComponent } from './views/mobile/seller/component/m-change-password/m-change-password.component';
import { MProfileComponent } from './views/mobile/seller/component/m-profile/m-profile.component';
import { MSellerLayoutComponent } from './core/layout/mobile/m-seller-layout/m-seller-layout.component';
import { MDashboardComponent } from './views/mobile/seller/component/m-dashboard/m-dashboard.component';
import { MCaraBerjualanComponent } from './views/mobile/front/component/m-cara-berjualan/m-cara-berjualan.component';
import { MOrderDetailBuyerComponent } from './views/mobile/buyer/component/m-order-detail-buyer/m-order-detail-buyer.component';
import { MTransactionBuyerComponent } from './views/mobile/buyer/component/m-transaction-buyer/m-transaction-buyer.component';
import { MFinishOrderComponent } from './views/mobile/front/component/m-finish-order/m-finish-order.component';
import { MCheckoutComponent } from './views/mobile/front/component/m-checkout/m-checkout.component';
import { MCartComponent } from './views/mobile/front/component/m-cart/m-cart.component';
import { MShippingAddressComponent } from './views/mobile/buyer/component/m-shipping-address/m-shipping-address.component';
import { MBillingAddressComponent } from './views/mobile/buyer/component/m-billing-address/m-billing-address.component';
import { MChangePasswordBuyerComponent } from './views/mobile/buyer/component/m-change-password-buyer/m-change-password-buyer.component';
import { MProfileBuyerComponent } from './views/mobile/buyer/component/m-profile-buyer/m-profile-buyer.component';
import { MBuyerLayoutComponent } from './core/layout/mobile/m-buyer-layout/m-buyer-layout.component';
import { MDashboardBuyerComponent } from './views/mobile/buyer/component/m-dashboard-buyer/m-dashboard-buyer.component';
import { MSignUpComponent } from './views/mobile/front/component/m-sign-up/m-sign-up.component';
import { MSignInComponent } from './views/mobile/front/component/m-sign-in/m-sign-in.component';
import { MCategoryComponent } from './views/mobile/front/component/m-category/m-category.component';
import { MFrontHomeComponent } from './views/mobile/front/component/m-front-home/m-front-home.component';
import { AsapbyBelisComponent } from './views/front/component/seller-center/asapby-belis/asapby-belis.component';
import { CaraBerjualanComponent } from './views/front/component/seller-center/cara-berjualan/cara-berjualan.component';
import { KnpBelisadaComponent } from './views/front/component/seller-center/knp-belisada/knp-belisada.component';
import { SellerCenterComponent } from './views/front/component/seller-center/seller-center.component';
import { SliderDepanComponent } from './views/front/component/slider-depan/slider-depan.component';
import { SellerProposeComponent } from './views/buyer/component/seller-propose/seller-propose.component';
import { LacakPesananComponent } from './views/front/component/lacak-pesanan/lacak-pesanan.component';
import { CustomerServiceComponent } from './views/front/component/customer-service/customer-service.component';
import { TransactionsComponent } from './views/front/component/transactions/transactions.component';
import { InboxBuyerComponent } from './views/buyer/component/inbox-buyer/inbox-buyer.component';
import { AfterSalesServiceComponent } from './views/front/component/after-sales-service/after-sales-service.component';
import { ContactUsComponent } from './views/front/component/contact-us/contact-us.component';
import { WarrantyComponent } from './views/front/component/warranty/warranty.component';
import { ReturnCancelComponent } from './views/front/component/return-cancel/return-cancel.component';
import { HowOrderComponent } from './views/front/component/how-order/how-order.component';
import { FaqComponent } from './views/front/component/faq/faq.component';
import { PrivacyPolicyComponent } from './views/front/component/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './views/front/component/terms-conditions/terms-conditions.component';
import { AboutUsComponent } from './views/front/component/about-us/about-us.component';
import { ConfirmationBuyerComponent } from './views/buyer/component/confirmation-buyer/confirmation-buyer.component';
import { OrderDetailBuyerComponent } from './views/buyer/component/order-detail-buyer/order-detail-buyer.component';
import { TransactionBuyerComponent } from './views/buyer/component/transaction-buyer/transaction-buyer.component';
import { ProfileBuyerComponent } from './views/buyer/component/profile-buyer/profile-buyer.component';
import { FinihOrderComponent } from './views/front/component/finih-order/finih-order.component';
import { ConfirmOrderComponent } from './views/front/component/confirm-order/confirm-order.component';
import { ShippingAddressComponent } from './views/buyer/component/shipping-address/shipping-address.component';
import { PaymentMethodComponent } from './views/front/component/payment-method/payment-method.component';
import { ShippingComponent } from './views/front/component/shipping/shipping.component';
import { BillingAddressComponent } from './views/buyer/component/billing-address/billing-address.component';
import { CartComponent } from './views/front/component/cart/cart.component';
import { CartBuyerComponent } from './views/buyer/component/cart-buyer/cart-buyer.component';
import { BuyerLayoutComponent } from './core/layout/buyer-layout/buyer-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { FrontLayoutComponent } from './core/layout/front-layout/front-layout.component';
import { HomeComponent } from './views/front/component/home/home.component';
import { ProductDetailComponent } from './views/front/component/product-detail/product-detail.component';
import { ProductSearchComponent } from './views/front/component/product-search/product-search.component';
import { PlainLayoutComponent } from './core/layout/plain-layout/plain-layout.component';
import { ActivationComponent } from './views/sellers/component/activation/activation.component';
import { AuthenticationLayoutComponent } from './core/layout/authentication-layout/authentication-layout.component';
import { LoginComponent } from './views/sellers/component/login/login.component';
import { PopUpComponent } from './views/sellers/component/registration/popUp/pop-up/pop-up.component';
import { ForgotPasswordComponent } from './views/sellers/component/forgot-password/forgot-password.component';
import { RegistrationComponent } from './views/sellers/component/registration/registration.component';
import { MaintenanceComponent } from './views/sellers/component/maintenance/maintenance.component';
import { Page404Component } from './views/sellers/component/page-404/page-404.component';
import { SendForgotPasswordComponent } from './views/sellers/component/send-forgot-password/send-forgot-password.component';
import { CategoryComponent } from './views/front/component/category/category.component';
import { SignUpComponent } from './views/front/component/sign-up/sign-up.component';
import { SignInComponent } from './views/front/component/sign-in/sign-in.component';
import { LostPasswordComponent } from './views/front/component/lost-password/lost-password.component';
import { DashboardBuyerComponent } from './views/buyer/component/dashboard-buyer/dashboard-buyer.component';
import { InfoComponent } from './views/front/component/info/info.component';
import { ChangePasswordBuyerComponent } from './views/buyer/component/change-password-buyer/change-password-buyer.component';
import { ProductTopBuyerComponent } from './views/buyer/component/product-top-buyer/product-top-buyer.component';
import { WishlistBuyerComponent } from './views/buyer/component/wishlist-buyer/wishlist-buyer.component';
import { CaraBerbelanjaComponent } from './views/front/component/cara-berbelanja/cara-berbelanja.component';
import { CareerComponent } from './views/front/component/career/career.component';
import { CopyrightPolicyComponent } from './views/front/component/copyright-policy/copyright-policy.component';
import { AsapComponent } from './views/front/component/asap/asap.component';
import { OnlyLoggedInUsersGuard } from './core/shared/authguard';
import { CheckoutComponent } from './views/front/component/checkout/checkout.component';
import { ProductTerbaruComponent } from './views/front/component/product-terbaru/product-terbaru.component';
import { CustomerCareComponent } from './views/front/component/customer-care/customer-care.component';
import { DownloadAppComponent } from './views/front/component/download-app/download-app.component';
import { PsnLoginComponent } from './views/front/component/psn-login/psn-login.component';
import { InboxComponent } from './views/front/component/seller-center/inbox/inbox.component';
import { BerjualanBelisadaComponent } from './views/front/component/seller-center/berjualan-belisada/berjualan-belisada.component';
import { FaqSellerCenterComponent } from './views/front/component/seller-center/faq-seller-center/faq-seller-center.component';
import { ReviewBuyerComponent } from './views/buyer/component/review-buyer/review-buyer.component';
import { DalemReviewComponent } from './views/buyer/component/review-buyer/dalem-review/dalem-review.component';
import { MFrontLayoutComponent } from './core/layout/mobile/m-front-layout/m-front-layout.component';
import { MCaraBerbelanjaComponent } from './views/mobile/front/component/m-cara-berbelanja/m-cara-berbelanja.component';
import { MConfirmationBuyerComponent } from './views/mobile/buyer/component/m-confirmation-buyer/m-confirmation-buyer.component';
import { MWishlistBuyerComponent } from './views/mobile/buyer/component/m-wishlist-buyer/m-wishlist-buyer.component';
import { MProductDetailComponent } from './views/mobile/front/component/m-product-detail/m-product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'home'
        }
      },
      {
        path: 'info-jual-beli',
        component: InfoComponent,
        data: {
          title: 'info'
        }
      },
      {
        path: 'inbox',
        component: InboxComponent,
        data: {
          title: 'info'
        }
      },
      {
        path: 'seller-center',
        component: SellerCenterComponent,
        children: [
          {
            path: 'inbox',
            component: InboxComponent,
            data: {
              title: 'dashboard'
            }
          },
          {
            path: 'Why-Choose-Us',
            component: KnpBelisadaComponent,
            data: {
              title: 'dashboard'
            }
          },
          {
            path: 'Faq-on-SellerCenter',
            component: FaqSellerCenterComponent,
            data: {
              title: 'dashboard'
            }
          },
          {
            path: 'berjualan-dibelisada',
            component: BerjualanBelisadaComponent,
            data: {
              title: 'dashboard'
            }
          },
          {
            path: 'cara-Berjualan',
            component: CaraBerjualanComponent,
            data: {
              title: 'dashboard'
            }
          },
          {
            path: 'ASAP-by-belisada',
            component: AsapbyBelisComponent,
            data: {
              title: 'dashboard'
            }
          },
        ],
      },
      {
        path: 'PesanLogin',
        component: PsnLoginComponent,
        data: {
          title: 'info'
        }
      },
      {
        path: 'cara-berbelanja',
        component: CaraBerbelanjaComponent,
        data: {
          title: 'cara'
        }
      },
      {
        path: 'Product-detail/:id/:alias',
        component: ProductDetailComponent,
        data: {
          title: 'product'
        }
      },
      {
        path: 'search',
        component: ProductSearchComponent,
        data: {
          title: 'product Search'
        }
      },
      {
        path: 'product-list',
        component: ProductSearchComponent,
        data: {
          title: 'product List'
        }
      }, {
        path: 'cart',
        component: CartComponent,
        data: {
          title: 'Cart'
        }
      }, {
        path: 'shipping',
        component: ShippingComponent,
        data: {
          title: 'shipping'
        }
      }, {
        path: 'payment-method',
        component: PaymentMethodComponent,
        data: {
          title: 'Payment Method'
        }
      }, {
        path: 'confirm-order',
        component: ConfirmOrderComponent,
        data: {
          title: 'Confirm Order'
        }
      }, {
        path: 'finish-order/:id',
        component: FinihOrderComponent,
        data: {
          title: 'Finish Order'
        }
      }, {
        path: 'dashboard',
        component: DashboardBuyerComponent,
        data: {
          title: 'home'
        }
      }, {
        path: 'about-us',
        component: AboutUsComponent,
        data: {
          title: 'About Us'
        }
      }, {
        path: 'career',
        component: CareerComponent,
        data: {
          title: 'Career'
        }
      }, {
        path: 'terms-conditions',
        component: TermsConditionsComponent,
        data: {
          title: 'Terms Conditions'
        }
      }, {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: {
          title: 'Privacy Policy'
        }
      }, {
        path: 'copyright-policy',
        component: CopyrightPolicyComponent,
        data: {
          title: 'Copyright Policy'
        }
      }, {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ'
        }
      }, {
        path: 'how-order',
        component: HowOrderComponent,
        data: {
          title: 'How Order'
        }
      }, {
        path: 'return-cancel',
        component: ReturnCancelComponent,
        data: {
          title: 'Return Cancel'
        }
      }, {
        path: 'warranty',
        component: WarrantyComponent,
        data: {
          title: 'warranty'
        }
      }, {
        path: 'contact-us',
        component: ContactUsComponent,
        data: {
          title: 'Contact Us'
        }
      }, {
        path: 'after-sales-service',
        component: AfterSalesServiceComponent,
        data: {
          title: 'After Sales Service'
        }
      }, {
        path: 'checkout',
        component: CheckoutComponent,
        data: {
          title: 'Checkout'
        }
      },
      {
        path: 'buyer',
        component: BuyerLayoutComponent,
        canActivateChild: [OnlyLoggedInUsersGuard],
        children: [
          {
            path: '',
            component: DashboardBuyerComponent,
            data: {
              title: 'dashboard'
            }
          },
          {
            path: 'dashboard',
            component: DashboardBuyerComponent,
            data: {
              title: 'dashboard'
            }
          },
          {
            path: 'change-password',
            component: ChangePasswordBuyerComponent,
            data: {
              title: 'Change Password'
            }
          },
          {
            path: 'billingAddress',
            component: BillingAddressComponent,
            data: {
              title: 'Change Password'
            }
          },
          {
            path: 'review-buyer/:id',
            component: ReviewBuyerComponent,
            data: {
              title: 'Change Password'
            }
          },
          {
            path: 'ulasan/:id',
            component: DalemReviewComponent,
            data: {
              title: 'Change Password'
            }
          },
          {
            path: 'shippingAddress',
            component: ShippingAddressComponent,
            data: {
              title: 'Change Password'
            }
          }, {
            path: 'product-top-buyer/:id',
            component: ProductTopBuyerComponent,
            data: {
              title: 'Product Top Buyer'
            }
          },
          {
            path: 'profile-buyer',
            component: ProfileBuyerComponent,
            data: {
              title: 'Profile Buyer'
            }
          },
          {
            path: 'wishlist-buyer',
            component: WishlistBuyerComponent,
            data: {
              title: 'Profile Buyer'
          }
        },
          {
            path: 'transaction-buyer',
            component: TransactionBuyerComponent,
            data: {
              title: 'Transaction Buyer'
            }
          },
           {
            path: 'order-detail-buyer/:id',
            component: OrderDetailBuyerComponent,
            data: {
              title: 'Order Detail Buyer'
            }
          },
          {
            path: 'inbox-buyer',
            component: InboxBuyerComponent,
            data: {
              title: 'Order Detail Buyer'
          }
        },
          {
            path: 'confirmation-buyer/:id',
            component: ConfirmationBuyerComponent,
            data: {
              title: 'Confirmation Buyer'
            }
          },
          {
            path: 'seller-propose',
            component: SellerProposeComponent,
            data: {
              title: 'Seller Propose'
            }
          }
        ]
      }
    ]
  },


  {
    path: 'mobile',
    component: MFrontLayoutComponent,
    children: [
      {
        path: '',
        component: MFrontHomeComponent,
        data: {
          title: 'home'
        }
      },
      {
        path: 'm-category/:id/:aliasname',
        component: MCategoryComponent,
        data: {
          title: 'category'
        }
      },
      {
        path: 'm-sign-in',
        component: MSignInComponent,
        data: {
          title: 'Sign In'
        }
      },
      {
        path: 'm-sign-up',
        component: MSignUpComponent,
        data: {
          title: 'Sign Up'
        }
      },
      {
        path: 'm-sign-up-success',
        component: MSignUpSuccessComponent,
        data: {
          title: 'Sign Up Success'
        }
      },
      {
        path: 'm-cara-berbelanja',
        component: MCaraBerbelanjaComponent,
        data: {
          title: 'Sign Up'
        }
      },
      {
        path: 'm-product-detail/:id/:alias',
        component: MProductDetailComponent,
        data: {
          title: 'product'
        }
      },
      {
        path: 'm-cart',
        component: MCartComponent,
        data: {
          title: 'Cart'
        }
      },
      {
        path: 'm-checkout',
        component: MCheckoutComponent,
        data: {
          title: 'Checkout'
        }
      },
      {
        path: 'm-lost-password',
        component: MLostPasswordComponent,
        data: {
          title: 'Lost Password'
        }
      },
      {
        path: 'm-contact-us',
        component: MContactUsComponent,
        data: {
          title: 'Contact Us'
        }
      },
      {
        path: 'm-after-sales-service',
        component: MAfterSalesServiceComponent,
        data: {
          title: 'After Sales Service'
        }
      },
      {
        path: 'm-finish-order/:id',
        component: MFinishOrderComponent,
        data: {
          title: 'Finish Order'
        }
      },
      {
        path: 'buyer',
        component: MBuyerLayoutComponent,
        canActivateChild: [OnlyLoggedInUsersGuard],
        children: [
          {
            path: '',
            component: MDashboardBuyerComponent,
            data: {
              title: 'dashboard'
            }
          },
          {
            path: 'm-profile-buyer',
            component: MProfileBuyerComponent,
            data: {
              title: 'Profile'
            }
          },
          {
            path: 'm-change-password-buyer',
            component: MChangePasswordBuyerComponent,
            data: {
              title: 'Change Password'
            }
          },
          {
            path: 'm-billingAddress',
            component: MBillingAddressComponent,
            data: {
              title: 'Billing Adress'
            }
          },
          {
            path: 'm-shippingAddress',
            component: MShippingAddressComponent,
            data: {
              title: 'Shipping Adress'
            }
          },
          {
            path: 'm-transaction-buyer',
            component: MTransactionBuyerComponent,
            data: {
              title: 'Transaksi Buyer'
            }
          },
          {
            path: 'm-order-detail-buyer/:id',
            component: MOrderDetailBuyerComponent,
            data: {
              title: 'Order Detail'
            }
          },
          {
            path: 'm-confirmation-buyer/:id',
            component: MConfirmationBuyerComponent,
            data: {
              title: 'Confirmation Buyer'
            }
          },
          {
            path: 'm-wishlist-buyer',
            component: MWishlistBuyerComponent,
            data: {
              title: 'Wishlist Buyer'
            }
          },
          {
            path: 'm-avatar-buyer',
            component: MAvatarBuyerComponent,
            data: {
              title: 'Avatar Buyer'
            }
          },
          {
            path: 'm-seller-propose',
            component: MSellerProposeComponent,
            data: {
              title: 'Seller Propose'
            }
          },
        ]
      }
    ]
  },

  {
    path: 'mobile-seller',
    component: MSellerLayoutComponent,
    canActivateChild: [OnlyLoggedInUsersGuard],
    children: [
      {
        path: '',
        component: MDashboardComponent,
        data: {
          title: 'dashboard'
        }
      },
      {
        path: 'm-profile',
        component: MProfileComponent,
        data: {
          title: 'profile'
        }
      },
      {
        path: 'm-change-password',
        component: MChangePasswordComponent,
        data: {
          title: 'Change Password'
        }
      },
      {
        path: 'm-rekening',
        component: MRekeningComponent,
        data: {
          title: 'Rekening'
        }
      },
      {
        path: 'm-toko',
        component: MTokoComponent,
        data: {
          title: 'Toko'
        }
      },
      {
        path: 'm-avatar-seller',
        component: MAvatarSellerComponent,
        data: {
          title: 'Avatar Seller'
        }
      },
      {
        path: 'm-courier',
        component: MCourierComponent,
        data: {
          title: 'Courier'
        }
      },
      {
        path: 'm-product-list',
        component: MProductListComponent,
        data: {
          title: 'Product List'
        }
      },
      {
        path: 'm-product',
        component: MProductComponent,
        data: {
          title: 'Product'
        }
      },
      {
        path: 'm-add-products/:id',
        component: MAddProductsComponent,
        data: {
          title: 'Add Product'
        }
      },
      {
        path: 'm-new-seller',
        component: MNewSellerComponent,
        data: {
          title: 'New Seller'
        }
      },
    ]
  },
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: 'category/:id/:aliasname',
        component: CategoryComponent,
        data: {
          title: 'category'
        }
      },
      {
        path: 'asap',
        component: AsapComponent,
        data: {
          title: 'asap'
        }
      },
      {
        path: 'Slider-Depan',
        component: SliderDepanComponent,
        data: {
          title: 'asap'
        }
      },
      {
        path: 'product-terbaru',
        component: ProductTerbaruComponent,
        data: {
          title: 'asap'
        }
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          title: 'transactions'
        }
      },
      {
        path: 'Customer-Service',
        component: CustomerServiceComponent,
        data: {
          title: 'Customer-Service'
        }
      },
      {
        path: 'Lacak-Pesanan',
        component: LacakPesananComponent,
        data: {
          title: 'Customer-Service'
        }
      },
      {
        path: 'Customer-Care',
        component: CustomerCareComponent,
        data: {
          title: 'Customer-Service'
        }
      },
      {
        path: 'Download-App',
        component: DownloadAppComponent,
        data: {
          title: 'Download-App'
        }
      },
    ]
  },
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: {
          title: 'Sign Up'
        }
      }
    ]
  },
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        data: {
          title: 'Sign In'
        }
      }
    ]
  },
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: 'lost-password',
        component: LostPasswordComponent,
        data: {
          title: 'Lost Password'
        }
      }
    ]
  },
  {
    path: '',
    component: PlainLayoutComponent,
    children: [
      {
      path: 'activation',
      component: ActivationComponent,
      data: {
        title: 'Activation'
      }
    },
    {
      path: 'send-forgot',
      component: SendForgotPasswordComponent,
      data: {
        title: 'Send-forgot'
      }
    },
    {
      path: 'buyer/shiping-address',
      component: BillingAddressComponent,
      data: {
        title: 'Buyer Dashboard'
      }
    }

  ]
},
  {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'pop-up',
        component: PopUpComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: 'Forgot Password'
        }
      },
      {
        path: 'register',
        component: RegistrationComponent,
        data: {
          title: 'Register'
        }
      }
    ]
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
  },
  {
    path: '404',
    component: Page404Component,
  },
  {
    path: 'seller',
    loadChildren: './views/sellers/modules/seller.modules#SellerModules'
  },
  // {
  //   path: 'mobile',
  //   loadChildren: './views/mobile/front/modules/m.front.modules#MFrontModules'
  // },
  {
    path: '**',
    redirectTo: '/404'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
