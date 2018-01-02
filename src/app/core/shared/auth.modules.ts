import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModules } from './shared.modules';
import { AuthenticationLayoutComponent } from '../layout/authentication-layout/authentication-layout.component';
import { LoginComponent } from '../../views/sellers/component/login/login.component';
import { RegistrationComponent } from '../../views/sellers/component/registration/registration.component';
import { ForgotPasswordComponent } from '../../views/sellers/component/forgot-password/forgot-password.component';
import { PopUpComponent } from '../../views/sellers/component/registration/popUp/pop-up/pop-up.component';
import { LoginService } from '../service/login/login.service';
import { RegisterService } from '../service/register/register.service';
import { SendEmailService } from '../service/sendEmail/send-email.service';



@NgModule({
  declarations: [
    AuthenticationLayoutComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    PopUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModules,
  ],
  providers: [
    LoginService,
    RegisterService,
    SendEmailService
  ]
})
export class AuthModules { }
