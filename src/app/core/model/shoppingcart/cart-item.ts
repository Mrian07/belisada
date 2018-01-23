export class CartItem {
    public itemCartId: number;
    public productId: number;
    public quantity: number = 0;
}

export class CartItemRequest {
    itemCartId: number;
    productId: number;
    quantity: number;
    price: number;
    weightPerItem: number;
}

export class CartItemResponse {
    items: CartItemDetailResponse[] = new Array<CartItemDetailResponse>();
    grossTotal: number = 0;
    deliveryTotal: number = 0;
    itemsTotal: number = 0;

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