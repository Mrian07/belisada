import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';
import { Page404Component, MaintenanceComponent } from '@belisada/features/error-pages';
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
  { path: 'buyer', loadChildren: 'app/features/buyer/buyer.module#BuyerModule' },
  { path: 'seller', loadChildren: 'app/features/seller/seller.module#SellerModule' },
  { path: 'search-result', loadChildren: 'app/features/search-result/search-result.module#SearchResultModule' },
  { path: 'product', loadChildren: 'app/features/product/product.module#ProductModule' },
  { path: 'transaction', loadChildren: 'app/features/transaction/transaction.module#TransactionModule' },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
  },
  {
    path: '**',
    component: Page404Component,
  },
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
