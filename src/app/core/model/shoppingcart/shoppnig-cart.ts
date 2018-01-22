import { CartItem } from './cart-item';
import { FreightRate } from '../FreightRate';

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public freightRate: FreightRate;
  public grossTotal: number = 0;
  public deliveryTotal: number = 0;
  public itemsTotal: number = 0;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.freightRate = src.freightRate;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }
}
