export class MidRequest {
  transaction_details: TransactionDetails;
  credit_card: CreditCard;
}

export class TransactionDetails {
  order_id: String;
  gross_amount: Number;
}

export class CreditCard {
  secure: boolean;
}

export class MidResponse {
  token: any;
  redirect_url: string;
}
