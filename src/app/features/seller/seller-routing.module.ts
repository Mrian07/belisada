import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSellerComponent, StoreComponent } from '@belisada/features/seller';
import { SellerComponent } from '@belisada/features/seller/seller.component';

const routes: Routes = [
    {
        path: '',
        component: SellerComponent,
        // canActivateChild: [OnlyLoggedInUsersGuard],
        children: [
            // {
            //     path: 'profile-seller',
            //     component: ProfileSellerComponent,
            //     data: {
            //         title: 'Profile Seller'
            //     }
            // },
            {
                path: 'store',
                component: StoreComponent,
                data: {
                    title: 'Store'
                }
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
