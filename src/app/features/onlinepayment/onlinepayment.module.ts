import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../theme/theme.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { OnlinepaymentRoutingModule } from './onlinepayment-routing.module';
import { OnlinepaymentErrorComponent } from './onlinepayment-error/onlinepayment-error.component';
import { OnlinepaymentSuccessComponent } from './onlinepayment-success/onlinepayment-success.component';
import { OnlinepaymentPendingComponent } from './onlinepayment-pending/onlinepayment-pending.component';
import { OnlinepaymentComponent } from './onlinepayment.component';

@NgModule({
  imports: [
    CommonModule,
    OnlinepaymentRoutingModule,

    CommonModule,
    ThemeModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [OnlinepaymentComponent, OnlinepaymentErrorComponent, OnlinepaymentSuccessComponent, OnlinepaymentPendingComponent]
})
export class OnlinepaymentModule { }
