import { InfoPerusahaanService } from './../../../core/service/perusahaan/info-perusahaan.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SellerRoutes } from './seller.routes';
import { FullLayoutComponent } from '../../../core/layout/full-layout/full-layout.component';
import { SearchDashboardComponent } from '../component/dashboard/search-dashboard/search-dashboard.component';
import { SidebarComponent } from '../component/sidebar/sidebar.component';
import { ModalPopupComponent } from '../component/modal-popup/modal-popup.component';
import { AddProductsComponent } from '../component/add-products/add-products.component';
import { ProfileComponent } from '../component/profile/profile.component';
import { RekeningComponent } from '../component/rekening/rekening.component';
import { TokoComponent } from '../component/toko/toko.component';
import { InfoPerusahaanComponent } from '../component/info-perusahaan/info-perusahaan.component';
import { ChangePasswordComponent } from '../component/change-password/change-password.component';
import { KontakComponent } from '../component/kontak/kontak.component';
import { KontakDetailComponent } from '../component/kontak-detail/kontak-detail.component';
import { SallesReportComponent } from '../component/salles-report/salles-report.component';
import { SalesStatusComponent } from '../component/dashboard/sales-status/sales-status.component';
import { FaqComponent } from '../component/faq/faq.component';
import { StatisticsComponent } from '../component/statistics/statistics.component';
import { HeaderComponent } from '../component/header/header.component';
import { ChattingComponent } from '../component/chatting/chatting.component';
import { FooterComponent } from '../component/footer/footer.component';
import { NotificationComponent } from '../component/dashboard/notification/notification.component';
import { MyTopProdukComponent } from '../component/dashboard/my-top-produk/my-top-produk.component';
import { ProdukReportComponent } from '../component/dashboard/produk-report/produk-report.component';
import { StatusInvoiceComponent } from '../component/dashboard/status-invoice/status-invoice.component';
import { PaymentInfoComponent } from '../component/payment-info/payment-info.component';
import { AccountLayoutComponent } from '../component/account-layout/account-layout.component';
import { RejectReturComponent } from '../component/salles-report/reject-retur/reject-retur.component';
import { StoreComponent } from '../component/store/store.component';
import { PlainSellerLayoutComponent } from '../../../core/layout/plain-seller-layout/plain-seller-layout.component';
import { ProductComponent } from '../component/product/product.component';
import { SharedModules } from '../../../core/shared/shared.modules';
import { BrandsService } from '../../../core/service/brands/brands.service';
import { MyTopProductService } from '../../../core/service/mytopproduct/my-top-product.service';
import { SalesStatusService } from '../../../core/service/salesstatus/sales-status.service';
import { AlamatserviceService } from '../../../core/service/alamat/alamatservice.service';
import { SendEmailService } from '../../../core/service/sendEmail/send-email.service';
import { ProfileService } from '../../../core/service/profile/profile.service';
import { SearchService } from '../../../core/service/search/search.service';
import { ForgotPasswordService } from '../../../core/service/forgotpassword/forgot-password.service';
import { ChangePasswordService } from '../../../core/service/changepassword/change-password.service';
import { StoreService } from '../../../core/service/store/store.service';
import { RekeningSService } from '../../../core/service/rekening/rekening-s.service';
import { AddproductService } from '../../../core/service/addproduct/addproduct.service';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { ProductReducer, StoreReducer, BankReducer } from '../../../store/reducers';
import { ProductEffects } from '../../../store/effects/index';
import { ChatService } from '../../../core/service/chat/chat.service';
import { TruncateModule } from 'ng2-truncate';


@NgModule({
  declarations: [
    FullLayoutComponent,
    SearchDashboardComponent,
    SidebarComponent,
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
    DashboardComponent,
    NotificationComponent,
    MyTopProdukComponent,
    ProdukReportComponent,
    StatusInvoiceComponent,
    PaymentInfoComponent,
    HeaderComponent,
    AccountLayoutComponent,
    RejectReturComponent,
    StoreComponent,
    PlainSellerLayoutComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    TruncateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModules,
    SellerRoutes,
    StoreModule.forFeature('product', ProductReducer),
    StoreModule.forFeature('store', StoreReducer),
    StoreModule.forFeature('bank', BankReducer),
    EffectsModule.forFeature([ProductEffects])
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
    ChangePasswordService,
    StoreService,
    RekeningSService,
    AddproductService,
    InfoPerusahaanService,
    ChatService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SellerModules { }
