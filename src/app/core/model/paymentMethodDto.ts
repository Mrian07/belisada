import { PaymentMethodDetail } from './PaymentMethodDetail';
import { PaymentMethod } from './PaymentMethod';

export class PaymentMethodDto {

    private _paymentMethod: PaymentMethod;
    private _paymentMethodDetails: PaymentMethodDetail[];

    get paymentMethod(): PaymentMethod {
        return this._paymentMethod;
    }

    set paymentMethod(paymentMethod: PaymentMethod) {
        this._paymentMethod = paymentMethod;
    }

    get paymentMethodDetails(): PaymentMethodDetail[] {
        return this._paymentMethodDetails;
    }

    set paymentMethodDetails(PaymentMethodDetails: PaymentMethodDetail[]) {
        this._paymentMethodDetails = PaymentMethodDetails;
    }

}
