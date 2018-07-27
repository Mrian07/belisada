export class Payment {
  paymentMethodId: number;
  paymentMethodName: string;
  paymentMethodCode: string;
  data: PaymentList[];
}

export class PaymentList {
  id: number;
  name: string;
  bankName: string;
  accountNumber: number;
  accountName: string;
  imageUrl: string;
}
