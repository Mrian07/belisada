import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthComponent, SigninComponent, SignUpComponent, SignUpActivationComponent,
  ForgotPasswordComponent, ResetPasswordComponent
} from '@belisada/features/auth';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SigninComponent,
        data: {
          title: 'Sign In'
        }
      },
      {
        path: 'sign-in/:id/:name',
        component: SigninComponent,
        data: {
          title: 'Sign In'
        }
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: {
          title: 'Sign Up'
        }
      },
      {
        path: 'activation',
        component: SignUpActivationComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: 'Lose Password'
        }
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Password'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
