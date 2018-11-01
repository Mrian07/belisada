import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GetShippingResponse } from '@belisada/core/models/address/address.model';
import { ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';

@Component({
  selector: 'select-shipping-method',
  template: `
    <select [(ngModel)]="shippingMethod" (change)="shippingMethodChange()">
      <option disabled value="">Pilih pengiriman</option>
      <option *ngFor="let item of data" [ngValue]="item">{{ item.name + ' ' + item.courierService + ' Rp ' + item.courierPrice }}</option>
    </select>
  `,
})
export class SelectShippingMethodComponent {

  @Input() data: ShippingRate[];
  @Output() select: EventEmitter<any> = new EventEmitter();

  public shippingMethod: GetShippingResponse | String;

  constructor() {
    this.shippingMethod = '';
  }

  public shippingMethodChange(): void {
    this.select.emit(this.shippingMethod);
  }
}
