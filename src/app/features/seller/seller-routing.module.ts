import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutSellerComponent, ProfileSellerComponent, StoreComponent } from '@belisada/features/seller';

const routes: Routes = [
    {
        path: '',
        component: LayoutSellerComponent,
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
