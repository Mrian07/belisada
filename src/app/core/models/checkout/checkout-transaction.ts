import { BaseResponseModel } from '@belisada/core/models/base-response.model';
import { CartItems } from '../transaction/transaction.model';

export class CheckoutReq {
  itemCartIds: number[];
  paymentMethodCode: string;
  voucherCode: string;
  voucherValue: number;
  channelId: number;
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

export class CheckoutShippingAddress {
  name: string;
  address: string;
  addressName: string;
  addressId: number;
  postal: number;
  countryId: number;
  regionId: number;
  cityId: number;
  districtId: number;
  villageId: number;
  countryName: string;
  regionName: string;
  cityName: string;
  districtName: string;
  villageName: string;
  isDefault: Boolean;
  phone: string;
  rajaOngkirId: number;
  orderNumber: number;
}

export class SuccessTransactionRes extends BaseResponseModel {
  data: SuccessTransactionData;
}

export class SuccessTransactionData {
  buyerEmail: string;
  buyerName: string;
  createdTime: string;
  expiredConfirmationPaymentBuyerDate: string;
  expiredConfirmationPaymentBuyerTime: number;
  expiredTimeIndo: string;
  expiredTime: string;
  grandTotal: number;
  imageUrl: string;
  invoiceNumber: string;
  paymentMethod: string;
  paymentMethodCode: string;
  paymentNumber: string;
  status: string;
  statusCode: string;
  bankAccount: ListBankAccount;
  cart: CartItems[];
}

export class ListBankAccount {
  accountName: string;
  accountNumber: number;
  bankId: number;
​​​  bankName: string;​
  imageUrl: string;
  name: string;
}
