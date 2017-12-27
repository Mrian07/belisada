import { AuthenticationLayoutComponent } from './../layouts/authentication-layout/authentication-layout.component';
import { PlainLayoutComponent } from './../layouts/plain-layout/plain-layout.component';
import { SendForgotPasswordComponent } from './../pages/seller/send-forgot-password/send-forgot-password.component';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ActivationComponent } from '../pages/seller/activation/activation.component';
import { FullLayoutComponent } from '../layouts/full-layout/full-layout.component';
import { DashboardComponent } from '../pages/seller/dashboard/dashboard.component';
import { ProductComponent } from '../pages/seller/product/product.component';
import { ModalPopupComponent } from '../pages/seller/modal-popup/modal-popup.component';
import { AddProductsComponent } from '../pages/seller/add-products/add-products.component';
import { ProfileComponent } from '../pages/seller/profile/profile.component';
import { RekeningComponent } from '../pages/seller/rekening/rekening.component';
import { TokoComponent } from '../pages/seller/toko/toko.component';
import { InfoPerusahaanComponent } from '../pages/seller/info-perusahaan/info-perusahaan.component';
import { ChangePasswordComponent } from '../pages/seller/change-password/change-password.component';
import { KontakComponent } from '../pages/seller/kontak/kontak.component';
import { SallesReportComponent } from '../pages/seller/salles-report/salles-report.component';
import { KontakDetailComponent } from '../pages/seller/kontak-detail/kontak-detail.component';
import { FaqComponent } from '../pages/seller/faq/faq.component';
import { PaymentInfoComponent } from '../pages/seller/payment-info/payment-info.component';
import { StatisticsComponent } from '../pages/seller/statistics/statistics.component';
import { OnlyLoggedInUsersGuard } from './authguard';


const sellerroutes: Routes = [
  {
      path: '',
    component: PlainLayoutComponent,
    data: {
      title: 'Seller'
    },
    children: [
      {
        path: 'activation/:key',
        component: ActivationComponent
      },
      {
        path: 'send-forgot/:key',
        component: SendForgotPasswordComponent
      },
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivateChild: [OnlyLoggedInUsersGuard],
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
        path: 'add-products/:id',
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
        path: 'change-password',
        component: ChangePasswordComponent,
      }, {
        path: 'kontak',
        component: KontakComponent,
      },
      {
        path: 'salles-report',
        component: SallesReportComponent,
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
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      }
    ]
  }
];

@NgModule ({
  imports: [RouterModule.forChild(sellerroutes)],
  exports: [RouterModule]
})
export class SellerRoutes { }
