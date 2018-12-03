import { BaseResponseModel } from '@belisada/core/models/base-response.model';

export class ContentOrderStatus {
    content: OrderStatus[];
    first: string;
    last: string;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export class OrderStatus {
    expiredTime: string;
    imageUrl: string;
    expiredConfirmationPaymentBuyerDate: string;
    countdown: Countdown;
    paymentMethod: string;
    paymentMethodCode: string;
    paymentNumber: string;
    status: string;
    statusCode: string;
    transaction: Transaction[];
    transactionId: number;
}
export class Countdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;

    status: number;
    message: string;
}

export class Transaction {
    cart: Cart[];
    grandTotal: number;
}

export class Cart {
    alamatPenerima: string;
    alamatSebagai: string;
    asuransi: number;
    cartItems: CartItems[];
    courierCode: string;

    courierPrice: number;
    courierService: string;
    destinationId: number;
    destinations: Destinations[];
    invoiceNumber: string;
    itemCartIds: number;
    namaPenerima: string;
    noResi: string;
    orderNumbere: string;
    originId: number;
    paymentNumber: string;
    phonePenerima: string;
    productIds: number;
    shipNumber: string;
    shippingAddressId: number;
    statusTracking: string;
    storeId: number;
    storeName: string;
    storeUrl: string;
    subTotal: number;
    totalWeight: number;
    useAsuransi: boolean;
}

export class CartItems {
    courierCode: string;
    courierPrice: number;
    courierService: string;
    imageUrl: string;
    itemCartId: number;
    name: string;
    note: string;
    priceList: number;
    productId: number;
    quantity: number;
    specialPrice: number;
    subtotal: number;
    total: number;
    totalWeight: number;
    weightPerItem: number;
    varians: Varians[];
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


export class Invoice {
    status: string;
    message: string;
    data: InvoiceData;
}

export class InvoiceData {
    alamatPenerima: string;
    alamatSebagai: string;
    orderNumber: string;
    asuransi: number;
    courierCode: string;
    courierPrice: string;
    courierService: string;
    createdOrder: string;
    destinationId: number;
    invoiceNumber: string;
    namaPenerima: string;
    paymentNumber: string;
    paymentMethod: string;
    storeName: string;
    buyerName: string;
    useAsuransi: boolean;
    totalWeight: string;
    total: string;
    cartItems: InvoiceCart[];
}

export class InvoiceCart {
    productId: number;
    name: string;
    priceList: number;
    specialPrice: number;
    quantity: number;
    imageUrl: string;
    subtotal: number;
    weightPerItem: number;
    totalWeight: number;
    note: string;
    sku: string;
    discount: number;
    varians: Varians[];
}

export class Varians {
    attributeId: number;
    name: string;
    varians: DetailVarian[];
}

export class DetailVarian {
    attributeValueId: number;
    value: string;
}


export class ItemsReceivedResponse extends BaseResponseModel {

}
