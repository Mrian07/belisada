import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GetShippingResponse } from '@belisada/core/models/address/address.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'select-shipping-addresses',
  template: `
    <select [(ngModel)]="shippingAddress" (change)="shippingAddressChange()">
      <option value="">Pilih alamat</option>
      <option *ngFor="let item of data" [ngValue]="item">{{ item.cityName + ', ' + item.regionName }} </option>
    </select>
  `,
})
export class SelectShippingAddressComponent implements OnInit {
  private _data = new BehaviorSubject<GetShippingResponse[]>([]);

  @Input() set data(value: GetShippingResponse[]) {
    this._data.next(value);
  }
  get data() {
    return this._data.getValue();
  }

  @Output() select: EventEmitter<any> = new EventEmitter();

  public shippingAddress: GetShippingResponse | String;

  constructor() {
    this.shippingAddress = '';
  }

  ngOnInit(): void {
    this._data.subscribe(data => {
      this.shippingAddress = data.find(x => x.isDefault === true);
      console.log(this.shippingAddress);
      this.select.emit(this.shippingAddress);
    });
  }

  public shippingAddressChange(): void {
    this.select.emit(this.shippingAddress);
  }
}
