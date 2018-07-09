import { TransactionComponent } from './transaction.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//const routes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    // canActivateChild: [OnlyLoggedInUsersGuard],
    children: [
      {
        path: 'checkout',
        component: CheckoutComponent,
        data: {
          title: 'Chekout'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
