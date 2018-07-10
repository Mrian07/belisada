import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from './../../theme/theme.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from '@belisada/features/transaction/transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TerimakasihPageComponent } from './terimakasih-page/terimakasih-page.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';
@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
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
