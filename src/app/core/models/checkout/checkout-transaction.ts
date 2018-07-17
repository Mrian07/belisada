import { BaseResponseModel } from '@belisada/core/models/base-response.model';

export class CheckoutReq {
  itemCartIds: number[];
  paymentMethodCode: string;
  voucherCode: string;
  voucherValue: number;
}

export class CheckoutRes extends BaseResponseModel {
  data: CheckoutResData;
}

export class CheckoutResData {
  transactionId: number;
  paymentNumber: string;
  status: string;
  statusCode: string;
  paymentMethodCode: string;
  paymentMethod: string;
  expiredTime: string;
  imageUrl: string;
  // transaction: []
}

// export class CheckoutModel {
//   itemCartIds: number[];
//   paymentMethodCode: string;
//   voucherCode: string;
//   voucherValue: number;
// }
