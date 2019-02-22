export class MidtransRequest {
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

export class MidtransResponse {
  token: any;
  redirect_url: string;
}
