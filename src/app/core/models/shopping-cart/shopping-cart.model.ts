import { CartItem } from '@belisada/core/models/shopping-cart/cart-item.model';
import { FreightRate } from '@belisada/core/models/courier/freight-rate';
import { BaseResponseModel } from '@belisada/core/models/base-response.model';

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

export class AddToCartRequest {
  productId: number;
  quantity: number;
}

export class AddToCartResponse extends BaseResponseModel {

}

export class CartItemResponse {
  items: CartItemDetailResponse[] = new Array<CartItemDetailResponse>();
  grossTotal = 0;
  deliveryTotal = 0;
  itemsTotal = 0;

  id: number;
  message: string;
  status: string;
}

export class CartItemDetailResponse {
  aliasName: string;
  imageUrl: string;
  itemCartId: number;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  sku: string;
  specialPrice: number;
  subtotal: number;
  totalWeight: number;
  userId: number;
  weightPerItem: number;
}
