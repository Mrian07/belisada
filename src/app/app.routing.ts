import { ModalPopupComponent } from './clients/pages/seller/modal-popup/modal-popup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './clients/layouts/full-layout/full-layout.component';
import { AuthenticationLayoutComponent } from './clients/layouts/authentication-layout/authentication-layout.component';
import { LoginComponent } from './clients/pages/login/login.component';
import { RegistrationComponent } from './clients/pages/registration/registration.component';
import { SidebarComponent } from './clients/components/sidebar/sidebar.component';
import { DashboardComponent } from './clients/pages/seller/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './clients/pages/forgot-password/forgot-password.component';
import { AddProductsComponent } from './clients/pages/seller/add-products/add-products.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
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
    path: 'seller',
    component: FullLayoutComponent,
    data: {
      title: 'Seller'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'modal-popup',
        component: ModalPopupComponent,
      },
      {
        path: 'add-products',
        component: AddProductsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
