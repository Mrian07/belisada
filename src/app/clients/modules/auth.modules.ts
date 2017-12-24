import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationLayoutComponent } from '../layouts/authentication-layout/authentication-layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegistrationComponent } from '../pages/registration/registration.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { PopUpComponent } from '../pages/registration/popUp/pop-up/pop-up.component';
import { SharedModules } from './shared.modules';
import { LoginService } from '../../servers/service/login/login.service';
import { RegisterService } from '../../servers/service/register/register.service';
import { SendEmailService } from '../../servers/service/sendEmail/send-email.service';



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
