import { BuyerLayoutComponent } from './core/layout/buyer-layout/buyer-layout.component';
import { SidebarBuyerComponent } from './views/front/component/buyer-dashboard/sidebar-buyer/sidebar-buyer.component';
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
import { BuyerDashboardComponent } from './views/front/component/buyer-dashboard/buyer-dashboard.component';
import { ShipingAddressComponent } from './views/front/component/buyer-dashboard/shiping-address/shiping-address.component';
import { DashboardBuyerComponent } from './views/buyer/component/dashboard-buyer/dashboard-buyer.component';
import { InfoComponent } from './views/front/component/info/info.component';
import { ChangePasswordBuyerComponent } from './views/buyer/component/change-password-buyer/change-password-buyer.component';

const routes: Routes = [
  {

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
    ]
  },
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
        path: 'Product-detail/:id',
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
      }
    ]
  },

  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: 'category/:id',
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
      path: 'buyer/dashboard',
      component: BuyerDashboardComponent,
      data: {
        title: 'Buyer Dashboard'
      }
    },
    {
      path: 'buyer/sidebar',
      component: SidebarBuyerComponent,
      data: {
        title: 'Buyer Dashboard'
      }
    },
    {
      path: 'buyer/shiping-address',
      component: ShipingAddressComponent,
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
