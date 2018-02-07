export class TrasnactionList {
  transactionId: number;
  transactionTime: string;
  grandTotal: string;
  paymentMethod: string;
  orderNumber: string;
  invoiceNumber: string;
  transactionStatus: string;
  transactionStatusCode: string;
  courierName: string;
  billingName: string;
  billingAddress: string;
  shippingAddress: string;
  productId: string;
  courierAmt: string;
  name: string;
  items: Items[];
  title: string;
  review: string;
  message?: string;
  star: number;
}

export class Items {
  productId: number;
  quantity: number;
  subtotal: number;
  name: string;
  aliasName: string;
  imageurl: string;
  sku: string;
}
