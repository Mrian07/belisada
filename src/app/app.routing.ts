import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LayoutBuyerComponent } from './components/buyer/layout-buyer/layout-buyer.component';
import { ProfileComponent } from './components/buyer/profile/profile.component';
import { SignUpActivationComponent } from './components/sign-up-activation/sign-up-activation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';
import { SaniComponent } from './components/sani/sani.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                data: {
                    title: 'home'
                }
            },
            {
                path: 'sign-in',
                component: SigninComponent,
                data: {
                    title: 'Sign In'
                }
            },
            {
                path: 'sign-up',
                component: SignUpComponent,
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
            }
        ]
    },
    {
        path: 'sani',
        component: SaniComponent
    },
    {
        path: 'sign-up-activation',
        component: SignUpActivationComponent
    },

    {
        path: 'buyer',
        component: LayoutBuyerComponent,
        children: [
          {
            path: '',
            component: ProfileComponent,
            data: {
              title: 'Profile'
            }
          },
        ]
    },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
