export class OrderStatus {
    asuransi: number;
    courierCode: string;
    courierPrice: string;
    courierService: string;
    description: string;

    destinations: Destinations;

    imageUrl: string;
    itemCartId: number;
    name: string;
    note: string;
    originId: number;
    priceList: number;
    productId: number;
    quantity: number;
    shippingAddressId: number;
    specialPrice: number;
    storeId: number;
    storeName: string;
    storeUrl: string;
    subtotal: number;
    total: number;
    totalWeight: number;
    useAsuransi: boolean;
    weightPerItem: number;
}

export class Destinations {
    destinationId: number;
    name: string;
    shippingAddressId: number;
}

export class UploadImgTransfer {
    imageUrl: string;
    transactionId: number;
}
