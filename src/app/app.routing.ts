import { MaintenanceComponent } from './clients/pages/maintenance/maintenance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivationLayoutComponent } from './clients/pages/account-layout/activation-layout/activation-layout.component';
import { AccountLayoutComponent } from './clients/pages/account-layout/account-layout.component';
import { PopUpComponent } from './clients/pages/registration/popUp/pop-up/pop-up.component';
import { StatisticsComponent } from './clients/pages/seller/statistics/statistics.component';
import { PlainLayoutComponent } from './clients/layouts/plain-layout/plain-layout.component';
import { ModalPopupComponent } from './clients/pages/seller/modal-popup/modal-popup.component';
import { AuthenticationLayoutComponent } from './clients/layouts/authentication-layout/authentication-layout.component';
import { LoginComponent } from './clients/pages/login/login.component';
import { RegistrationComponent } from './clients/pages/registration/registration.component';
import { ForgotPasswordComponent } from './clients/pages/forgot-password/forgot-password.component';
import { FrontLayoutComponent } from './clients/layouts/front-layout/front-layout.component';
import { HomeComponent } from './clients/pages/front/home/home.component';
import { ProductDetailComponent } from './clients/pages/front/product-detail/product-detail.component';
import { PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { NotFoundComponent } from './clients/pages/not-found/not-found.component';
import { OnlyLoggedInUsersGuard } from './clients/modules/authguard';
import { InfoComponent } from './clients/pages/info/info.component';
import { ActivationComponent } from './clients/pages/seller/activation/activation.component';
import { SendForgotPasswordComponent } from './clients/pages/seller/send-forgot-password/send-forgot-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: 'home',
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
        path: 'Product-detail',
        component: ProductDetailComponent,
        data: {
          title: 'product'
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
    path: 'seller',
    loadChildren: './clients/modules/seller.modules#SellerModules',
  },
  {
    path: '404',
    component: NotFoundComponent
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
