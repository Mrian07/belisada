export class Checkout {

    // userId: number;
    grandTotal: number;
    paymentMethod: string;
    billingAddress: number;
    shippingAddress: number;
    courierId: number;
    isoncePickup: string;
    courierName: string;
    courierAmt: number;
    mBankAccountId: number;

    public updateFrom(src: Checkout) {
        // this.userId = src.userId;
        this.grandTotal = src.grandTotal;
        this.paymentMethod = src.paymentMethod;
        this.billingAddress = src.billingAddress;
        this.shippingAddress = src.shippingAddress;
        this.courierId = src.courierId;
        this.isoncePickup = src.isoncePickup;
        this.courierName = src.courierName;
        this.courierAmt = src.courierAmt;
        this.mBankAccountId = src.mBankAccountId;
    }

    constructor() { }
}

export class CheckoutResponse {

    message: string;
    status: string;

    constructor() { }
}
