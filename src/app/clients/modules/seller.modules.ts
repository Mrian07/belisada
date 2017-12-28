import { StoreService } from './../../servers/service/store/store.service';
import { ForgotPasswordService } from './../../servers/service/forgotpassword/forgot-password.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModules } from './shared.modules';
import { SellerRoutes } from './seller.routes';
import { FullLayoutComponent } from '../layouts/full-layout/full-layout.component';
import { DashboardComponent } from '../pages/seller/dashboard/dashboard.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ProductComponent } from '../pages/seller/product/product.component';
import { ModalPopupComponent } from '../pages/seller/modal-popup/modal-popup.component';
import { AddProductsComponent } from '../pages/seller/add-products/add-products.component';
import { ProfileComponent } from '../pages/seller/profile/profile.component';
import { RekeningComponent } from '../pages/seller/rekening/rekening.component';
import { TokoComponent } from '../pages/seller/toko/toko.component';
import { InfoPerusahaanComponent } from '../pages/seller/info-perusahaan/info-perusahaan.component';
import { ChangePasswordComponent } from '../pages/seller/change-password/change-password.component';
import { KontakComponent } from '../pages/seller/kontak/kontak.component';
import { KontakDetailComponent } from '../pages/seller/kontak-detail/kontak-detail.component';
import { SallesReportComponent } from '../pages/seller/salles-report/salles-report.component';
import { SalesStatusComponent } from '../components/dashboard/sales-status/sales-status.component';
import { FaqComponent } from '../pages/seller/faq/faq.component';
import { StatisticsComponent } from '../pages/seller/statistics/statistics.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ChattingComponent } from '../components/chatting/chatting.component';
import { SearchDashboardComponent } from '../components/dashboard/search-dashboard/search-dashboard.component';
import { NotificationComponent } from '../components/dashboard/notification/notification.component';
import { MyTopProdukComponent } from '../components/dashboard/my-top-produk/my-top-produk.component';
import { ProdukReportComponent } from '../components/dashboard/produk-report/produk-report.component';
import { StatusInvoiceComponent } from '../components/dashboard/status-invoice/status-invoice.component';
import { PaymentInfoComponent } from '../pages/seller/payment-info/payment-info.component';
import { AccountLayoutComponent } from '../pages/account-layout/account-layout.component';
import { ActivationComponent } from '../pages/seller/activation/activation.component';
import { BrandsService } from '../../servers/service/brands/brands.service';
import { AlamatserviceService } from '../../servers/service/alamat/alamatservice.service';
import { MyTopProductService } from '../../servers/service/mytopproduct/my-top-product.service';
import { SalesStatusService } from '../../servers/service/salesstatus/sales-status.service';
import { SendEmailService } from '../../servers/service/sendEmail/send-email.service';
import { ProfileService } from '../../servers/service/profile/profile.service';
import { ActivationLayoutComponent } from '../pages/account-layout/activation-layout/activation-layout.component';
import { RejectReturComponent } from '../pages/seller/salles-report/reject-retur/reject-retur.component';
import { SearchService } from '../../servers/service/search/search.service';
import { SendForgotPasswordComponent } from '../pages/seller/send-forgot-password/send-forgot-password.component';
import { ChangePasswordService } from '../../servers/service/changepassword/change-password.service';



@NgModule({
  declarations: [
    FullLayoutComponent,
    DashboardComponent,
    SidebarComponent,
    ProductComponent,
    ModalPopupComponent,
    AddProductsComponent,
    ProfileComponent,
    RekeningComponent,
    TokoComponent,
    InfoPerusahaanComponent,
    ChangePasswordComponent,
    KontakComponent,
    KontakDetailComponent,
    SallesReportComponent,
    SalesStatusComponent,
    FaqComponent,
    StatisticsComponent,
    HeaderComponent,
    FooterComponent,
    ChattingComponent,
    SearchDashboardComponent,
    NotificationComponent,
    MyTopProdukComponent,
    ProdukReportComponent,
    StatusInvoiceComponent,
    PaymentInfoComponent,
    HeaderComponent,
    AccountLayoutComponent,
    RejectReturComponent,
    SendForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModules,
    SellerRoutes
  ],
  providers: [
    BrandsService,
    MyTopProductService,
    SalesStatusService,
    AlamatserviceService,
    SendEmailService,
    ProfileService,
    SearchService,
    ForgotPasswordService,
    ChangePasswordService
    StoreService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SellerModules { }
