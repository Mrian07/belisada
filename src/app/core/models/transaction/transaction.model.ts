export class OrderStatus {
    expiredTime: string;
    imageUrl: string;
    paymentMethod: string;
    paymentMethodCode: string;
    paymentNumber: string;
    status: string;
    statusCode: string;
    transaction: Transaction[];
    transactionId: number;
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


export class Invoice{
    status: string;
    message: string;
    data: InvoiceData[];
}

export class InvoiceData{
    alamatPenerima: string;
    alamatSebagai: string;
    asuransi: number;
    courierCode: string;
    courierPrice: string;
    courierService: string;
    createdOrder: string;
    destinationId: number;
    invoiceNumber: string;
    namaPenerima: string;
    paymentNumber: string;
    cartItems: InvoiceCart[];
}

export class InvoiceCart{

}