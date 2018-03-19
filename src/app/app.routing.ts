import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: {
                    title: 'home'
                }
            },
            {
                path: 'signin',
                component: SigninComponent,
                data: {
                    title: 'Sign In'
                }
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
                data: {
                    title: 'Lose Password'
                }
            }
        ]
    },
    {
        path: 'daftar',
        component: SignUpComponent,
    }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
