import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './seller/dashboard/dashboard.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ModalPopupComponent } from './seller/modal-popup/modal-popup.component';

@NgModule({
  imports: [ PagesRoutingModule ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ModalPopupComponent
  ]
})
export class ViewsModule { }
