import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '@belisada/features/buyer/profile/profile.component';
import { ProfileEditComponent } from '@belisada/features/buyer/profile-edit/profile-edit.component';
import { CreateStoreComponent } from '@belisada/features/buyer/create-store/create-store.component';
import { BuyerComponent } from '@belisada/features/buyer/buyer.component';
import { OnlyLoggedInUsersGuard } from '@belisada/core/services';
import { ConfirmationComponent } from '@belisada/features/buyer/confirmation/confirmation.component';
import { ComplaintComponent } from '@belisada/features/buyer/complaint/complaint.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerComponent,
    canActivateChild: [OnlyLoggedInUsersGuard],
    children: [
      // {
      //     path: '',
      //     component: ProfileComponent,
      //     data: {
      //         title: 'Profile'
      //     }
      // },
      {
        path: 'order',
        component: OrderComponent,
        data: {
          title: 'Order'
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
        path: 'confirmation/:id',
        component: ConfirmationComponent,
        data: {
          title: 'Konfirmasi Pembayaran'
        }
      },
      {
        path: 'create-store',
        component: CreateStoreComponent,
        data: {
          title: 'Store'
        }
      },
      {
        path: 'bantuan',
        component: ComplaintComponent,
        data: {
          title: 'Bantuan'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
