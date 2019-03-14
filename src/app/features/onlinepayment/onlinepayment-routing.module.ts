import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlinepaymentComponent } from './onlinepayment.component';
import { OnlinepaymentSuccessComponent } from './onlinepayment-success/onlinepayment-success.component';
import { OnlinepaymentErrorComponent } from './onlinepayment-error/onlinepayment-error.component';
import { OnlinepaymentPendingComponent } from './onlinepayment-pending/onlinepayment-pending.component';

const routes: Routes = [
  {
    path: '',
    component: OnlinepaymentComponent,
    children: [
      {
        path: 'success',
        component: OnlinepaymentSuccessComponent,
        data: {
          title: 'Online Payment Success'
        }
      },
      {
        path: 'error',
        component: OnlinepaymentErrorComponent,
        data: {
          title: 'Online Payment Error'
        }
      },
      {
        path: 'pending',
        component: OnlinepaymentPendingComponent,
        data: {
          title: 'Online Payment Pending'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlinepaymentRoutingModule { }
