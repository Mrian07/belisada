import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './seller/dashboard/dashboard.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProductComponent } from './seller/product/product.component';
import { ModalPopupComponent } from './seller/modal-popup/modal-popup.component';
import { ProfileComponent } from './seller/profile/profile.component';
import { RekeningComponent } from './seller/rekening/rekening.component';
import { TokoComponent } from './seller/toko/toko.component';
import { InfoPerusahaanComponent } from './seller/info-perusahaan/info-perusahaan.component';
import { KontakComponent } from './seller/kontak/kontak.component';
import { SallesReportComponent } from './seller/salles-report/salles-report.component';
import { RejectReturComponent } from './seller/salles-report/reject-retur/reject-retur.component';
import { KontakDetailComponent } from './seller/kontak-detail/kontak-detail.component';
import { FaqComponent } from './seller/faq/faq.component';
import { PaymentInfoComponent } from './seller/payment-info/payment-info.component';
import { StatisticsComponent } from './seller/statistics/statistics.component';

@NgModule({
  imports: [ PagesRoutingModule ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ProductComponent,
    ModalPopupComponent,
    ProfileComponent,
    RekeningComponent,
    TokoComponent,
    InfoPerusahaanComponent,
    KontakComponent,
    SallesReportComponent,
    RejectReturComponent,
    KontakDetailComponent,
    FaqComponent,
    PaymentInfoComponent,
    StatisticsComponent
  ]
})
export class ViewsModule { }
