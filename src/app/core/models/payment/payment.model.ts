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

export class Confirmation {
  accountName: string;
  accountNumber: string;
  bankId: number;
  confirmationId: 0;
  imageUrl: ImageUrl[];
  news: string;
  nominal: number;
  paymentNumber: string;
  transerDate: string;
  transferTo: string;
  status: number;
}

export class ImageUrl {

}


export class GetConfirmation {
  status: number;
  message: string;
  data: DataConfirm;
}

export class DataConfirm {
  bankId: number;
  accountName: string;
  accountNumber: number;
  nominal: number;
  paymentNumber: string;
  transferTo: string;
  transferFrom: string;
  image: string;
  news: string;
  userId: number;
  transerDate: any;
}
export class Ipay88Req {
  MerchantCode: string;
  PaymentId: string;
  RefNo: string;
  Amount: number;
  Currency: string;
  ProdDesc: string;
  UserName: string;
  UserEmail: string;
  UserContact: string;
  Remark: string;
  Lang: string;
  signature: string;
  ResponseURL: string;
  BackendURL: string;
}
