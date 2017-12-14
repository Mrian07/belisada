import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './seller/dashboard/dashboard.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [ PagesRoutingModule ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    ForgotPasswordComponent
  ]
})
export class ViewsModule { }
