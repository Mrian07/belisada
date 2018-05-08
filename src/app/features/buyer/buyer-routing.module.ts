import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutBuyerComponent } from '@belisada/features/buyer/layout-buyer/layout-buyer.component';
import { ProfileComponent } from '@belisada/features/buyer/profile/profile.component';
import { ProfileEditComponent } from '@belisada/features/buyer/profile-edit/profile-edit.component';
import { CreateStoreComponent } from '@belisada/features/buyer/create-store/create-store.component';

const routes: Routes = [
  {
        path: '',
        component: LayoutBuyerComponent,
        // canActivateChild: [OnlyLoggedInUsersGuard],
        children: [
            // {
            //     path: '',
            //     component: ProfileComponent,
            //     data: {
            //         title: 'Profile'
            //     }
            // },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
