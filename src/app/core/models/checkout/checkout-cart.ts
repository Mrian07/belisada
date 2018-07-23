import { BaseResponseModel } from '@belisada/core/models/base-response.model';

export class CheckoutTrx {
  cart: CartCheckout[];
  grandTotal: number;
}

export class CartCheckout {
  storeUrl: string;
  storeName: string;
  storeId: number;
  originId: number;
  destinationId: number;
  shippingAddressId: number;
  itemCartIds: number[];
  productIds: number[];
  cartItems: CartItemCheckout[];

  destinations: DestinationCheckout[];
  courierCode: string;
  courierPrice: number;
  courierService: string;
  useAsuransi: Boolean;
  totalWeight: number;
  asuransi: number;
}

export class CartItemCheckout {
  itemCartId: number;
  productId: number;
  name: string;
  priceList: number;
  quantity: number;
  imageUrl: string;
  subtotal: number;
  weightPerItem: number;
  totalWeight: number;
  note: string;
  total: number;
}

export class DestinationCheckout {
  shippingAddressId: number;
  destinationId: number;
  name: string;
}

// ---------------------------------

export class UpdateCartReq {
  itemCartId: number;
  note: string;
  quantity: number;
}

export class UpdateCartRes extends BaseResponseModel {

}

export class UpdateShippingReq {
  courierCode: string;
  courierService: string;
  itemCartIds: number[];
  shippingAddressId: number;
}

export class UpdateShippingRes extends BaseResponseModel {

}
