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
        path: 'finish-order',
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
        path: 'buyer',
        component: BuyerLayoutComponent,
        children: [
          {
            path: 'dashboard',
            component: DashboardBuyerComponent,
            data: {
              title: 'home'
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
            path: 'order-detail-buyer',
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
            path: 'confirmation-buyer',
            component: ConfirmationBuyerComponent,
            data: {
              title: 'Confirmation Buyer'
            }
          }
        ]
      }
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
      }
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
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
