import { PriceAndStock } from '@belisada/core/models/product/price-and-strock.model';
import { Delivery } from '@belisada/core/models/product/delivery.model';

export class Product {
    pictures: string[];
    name: string;
    brand: string;
    category: string;
    description: string;
    specs: any[];
    priceandstock: PriceAndStock;
    delivery: Delivery;
}
