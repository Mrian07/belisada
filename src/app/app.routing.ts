import { PlainLayoutComponent } from './clients/layouts/plain-layout/plain-layout.component';
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
import { AddProductsComponent } from './clients/pages/seller/add-products/add-products.component';
import { ProductComponent } from './clients/pages/seller/product/product.component';
import { ProfileComponent } from './clients/pages/seller/profile/profile.component';
import { RekeningComponent } from './clients/pages/seller/rekening/rekening.component';
import { TokoComponent } from './clients/pages/seller/toko/toko.component';
import { InfoPerusahaanComponent } from './clients/pages/seller/info-perusahaan/info-perusahaan.component';
import { KontakComponent } from './clients/pages/seller/kontak/kontak.component';
import { SallesReportComponent } from './clients/pages/seller/salles-report/salles-report.component';
import { RejectReturComponent } from './clients/pages/seller/salles-report/reject-retur/reject-retur.component';
import { KontakDetailComponent } from './clients/pages/seller/kontak-detail/kontak-detail.component';
import { FaqComponent } from './clients/pages/seller/faq/faq.component';
import { PaymentInfoComponent } from './clients/pages/seller/payment-info/payment-info.component';

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
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'modal-popup',
        component: ModalPopupComponent,
      },
      {
        path: 'add-products',
        component: AddProductsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'rekening',
        component: RekeningComponent,
      },
      {
        path: 'toko',
        component: TokoComponent,
      },
      {
        path: 'info-perusahaan',
        component: InfoPerusahaanComponent,
      }, {
        path: 'kontak',
        component: KontakComponent,
      },
      {
        path: 'salles-report',
        component: PlainLayoutComponent,
        children: [
          {
            path: 'reject-retur',
            component: RejectReturComponent,
          },
          {
            path: 'penjualan',
            component: SallesReportComponent
          }

        ]
      },
      {
        path: 'kontak',
        component: KontakComponent,
      },
      {
        path: 'kontak-detail',
        component: KontakDetailComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'payment-info',
        component: PaymentInfoComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }