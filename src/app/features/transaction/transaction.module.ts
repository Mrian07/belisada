import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from './../../theme/theme.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from '@belisada/features/transaction/transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { TerimakasihPageComponent } from './terimakasih-page/terimakasih-page.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);
@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CountdownTimerModule.forRoot()
  ],
  declarations: [
    TransactionComponent,
    CheckoutComponent,
    TerimakasihPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionModule { }
