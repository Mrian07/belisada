import { ProfileSellerComponent } from './components/seller/profile-seller/profile-seller.component';
import { SignInSellerComponent } from './components/sign-in-seller/sign-in-seller.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { Page404Component } from './components/page-404/page-404.component';
import { ProfileEditComponent } from './components/buyer/profile-edit/profile-edit.component';
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
import { AuthenticationComponent } from './components/layout/authentication/authentication.component';
import { StoreComponent } from './components/seller/store/store.component';
import { LayoutSellerComponent } from './components/seller/layout-seller/layout-seller.component';
import { OnlyLoggedInUsersGuard } from './core/services/authentication/authguard';
import { CreateStoreComponent } from './components/buyer/create-store/create-store.component';

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
            }
        ]
    },
    {
        path: 'sign-in-seller',
        component: SignInSellerComponent,
        data: {
            title: 'Sign In Seller'
        }
    },
    {
        path: 'account',
        component: AuthenticationComponent,
        children: [
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
    },

    {
        path: 'buyer',
        component: LayoutBuyerComponent,
        canActivateChild: [OnlyLoggedInUsersGuard],
        children: [
            {
                path: '',
                component: ProfileComponent,
                data: {
                    title: 'Profile'
                }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    title: 'Profile'
                }
            },
            {
                path: 'profile-edit',
                component: ProfileEditComponent,
                data: {
                    title: 'Edit Profile'
                }
            },
            {
                path: 'create-store',
                component: CreateStoreComponent,
                data: {
                    title: 'Store'
                }
            }
        ]
    },
    {
        path: 'seller',
        component: LayoutSellerComponent,
        canActivateChild: [OnlyLoggedInUsersGuard],
        children: [
            {
                path: 'profile-seller',
                component: ProfileSellerComponent,
                data: {
                    title: 'Profile Seller'
                }
            },

            // {
            //     path: 'store',
            //     component: StoreComponent,
            //     data: {
            //         title: 'Store'
            //     }
            // }
        ]
    },
    {
        path: 'sani',
        component: SaniComponent
    },
    {
        path: '**',
        component: Page404Component,
    },
    {
        path: 'maintenance',
        component: MaintenanceComponent,
    },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
