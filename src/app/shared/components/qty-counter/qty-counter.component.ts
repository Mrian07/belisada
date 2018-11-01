import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'qty-counter',
  template: `
    <button class="qty__button" (click)="changeQty('-')"><fa-icon [icon]="['fas', 'minus']"></fa-icon></button>
    <span class="qty">{{qty}}</span>
    <button class="qty__button" (click)="changeQty('+')"><fa-icon [icon]="['fas', 'plus']"></fa-icon></button>
  `,
  styleUrls: ['./qty-counter.component.scss']
})
export class QtyCounterComponent {

  @Input() qty: number;
  @Output() updateQty: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.qty = 1;
  }

  private _mathItUp = {
    '+': function(x, y) { return x + y; },
    '-': function(x, y) { return x - y; },
  };

  public changeQty(operator: string) {
    if (operator === '-' && this.qty <= 1) return;
    this.qty = this._mathItUp[operator](this.qty, 1);
    this.updateQty.emit(this.qty);
  }
}
