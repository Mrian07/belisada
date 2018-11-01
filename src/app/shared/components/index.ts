import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { QtyCounterComponent } from './qty-counter/qty-counter.component';
import { SelectShippingAddressComponent } from './select-shipping-address/select-shipping-address.component';
import { SelectShippingMethodComponent } from './select-shipping-method/select-shipping-method.component';

library.add(fas, far, fab);

const COMPONENTS = [
  QtyCounterComponent,
  SelectShippingAddressComponent,
  SelectShippingMethodComponent
];

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
