import { ProductConditionEnum } from '@belisada/core/enum';

export class PriceAndStock {
    condition: ProductConditionEnum;
    price: number;
    stock: number;
    warranty: string;
}
