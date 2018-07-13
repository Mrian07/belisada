import { CartItem } from '@belisada/core/models/shopping-cart/cart-item.model';
import { FreightRate } from '@belisada/core/models/courier/freight-rate';

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public freightRate: FreightRate;
  public grossTotal = 0;
  public deliveryTotal = 0;
  public itemsTotal = 0;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.freightRate = src.freightRate;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }
}
