import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [ PagesRoutingModule ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent
  ]
})
export class ViewsModule { }
