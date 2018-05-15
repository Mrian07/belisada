import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSellerComponent, StoreComponent } from '@belisada/features/seller';
import { SellerComponent } from '@belisada/features/seller/seller.component';
import { OnlyLoggedInUsersGuard } from '@belisada/core/services';
import { AddProductComponent } from '@belisada/features/seller/add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    canActivateChild: [OnlyLoggedInUsersGuard],
    children: [
      {
        path: 'profile-seller',
        component: ProfileSellerComponent,
        data: {
          title: 'Profile Seller'
        }
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        data: {
          title: 'Add Product'
        }
      },
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
