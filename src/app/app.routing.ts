import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SaniComponent } from './components/sani/sani.component';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';
import { Page404Component, MaintenanceComponent } from '@belisada/features/error-pages';
// import { AuthModule } from '@belisada/features/auth/auth.module';
import { AuthComponent, SigninComponent, SignUpComponent, SignUpActivationComponent,
  ForgotPasswordComponent, ResetPasswordComponent } from '@belisada/features/auth';


import { LandingPageComponent } from '@belisada/features/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    children: [
        {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Home'
        }
      },
    ]
  },
  { path: 'account', loadChildren: 'app/features/auth/auth.module#AuthModule' },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
  },
  {
    path: '**',
    component: Page404Component,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


 // { path: '', loadChildren: 'app/features/features.module#FeaturesModule' },
    // {
    //     path: 'sign-in-seller',
    //     component: SignInSellerComponent,
    //     data: {
    //         title: 'Sign In Seller'
    //     }
    // },
    // {
    //     path: 'account',
    //     component: AuthenticationComponent,
    //     children: [
    //         {
    //             path: 'sign-in',
    //             component: SigninComponent,
    //             data: {
    //                 title: 'Sign In'
    //             }
    //         },
    //         {
    //             path: 'sign-up',
    //             component: SignUpComponent,
    //             data: {
    //                 title: 'Sign Up'
    //             }
    //         },
    //         {
    //             path: 'activation',
    //             component: SignUpActivationComponent
    //         },
    //         {
    //             path: 'forgot-password',
    //             component: ForgotPasswordComponent,
    //             data: {
    //                 title: 'Lose Password'
    //             }
    //         },
    //         {
    //             path: 'reset-password',
    //             component: ResetPasswordComponent,
    //             data: {
    //                 title: 'Reset Password'
    //             }
    //         },
    //     ]
    // },

    // {
    //     path: 'buyer',
    //     component: LayoutBuyerComponent,
    //     canActivateChild: [OnlyLoggedInUsersGuard],
    //     children: [
    //         {
    //             path: '',
    //             component: ProfileComponent,
    //             data: {
    //                 title: 'Profile'
    //             }
    //         },
    //         {
    //             path: 'profile',
    //             component: ProfileComponent,
    //             data: {
    //                 title: 'Profile'
    //             }
    //         },
    //         {
    //             path: 'profile-edit',
    //             component: ProfileEditComponent,
    //             data: {
    //                 title: 'Edit Profile'
    //             }
    //         },
    //         {
    //             path: 'create-store',
    //             component: CreateStoreComponent,
    //             data: {
    //                 title: 'Store'
    //             }
    //         }
    //     ]
    // },

    // {
    //     path: 'seller',
    //     component: LayoutSellerComponent,
    //     canActivateChild: [OnlyLoggedInUsersGuard],
    //     children: [
    //         {
    //             path: 'profile-seller',
    //             component: ProfileSellerComponent,
    //             data: {
    //                 title: 'Profile Seller'
    //             }
    //         },

            // {
            //     path: 'store',
            //     component: StoreComponent,
            //     data: {
            //         title: 'Store'
            //     }
            // }
    //     ]
    // },

    // {
    //     path: 'sani',
    //     component: SaniComponent
    // },

    // {
    //     path: '**',
    //     component: LayoutComponent,
    //     children: [
    //         {
    //             path: '**',
    //             component: Page404Component,
    //         }
    //     ]
    // },

    // {
    //     path: '**',
    //     component: Page404Component,
    // },

    // {
    //     path: 'maintenance',
    //     component: MaintenanceComponent,
    // },
// ];
