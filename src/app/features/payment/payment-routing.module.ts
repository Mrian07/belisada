import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from '@belisada/features/payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    data: {
      title: 'Payments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
