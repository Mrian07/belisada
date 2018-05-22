import { PriceAndStock } from '@belisada/core/models/product/price-and-strock.model';
import { Delivery } from '@belisada/core/models/product/delivery.model';

export class Product {
    pictures: string[] = [];
    name: string;
    brand: string;
    category: string;
    description: string;
    specs: any[];
    priceandstock: PriceAndStock;
    delivery: Delivery;
}


export class AddProductRequest {
    brandId: number;
    categoryThreeId: number;
    classification: string;
    couriers: ProductCourier[];
    description: string;
    descriptionEn: string;
    dimensionsWidth: number;
    dimensionsheight: number;
    dimensionslength: number;
    guaranteeTime: string;
    guaranteeType: string;
    highlight: string;
    highlightEn: string;
    imageUrl: string[];
    isGuarantee: true;
    name: string;
    nameEn: string;
    partNumber: string;
    pricelist: number;
    pricelistlast: number;
    qty: number;
    qtyonhand: number;
    qtyonseller: number;
    serialNo: string;
    specification: ProductSpecification[];
    volume: number;
    weight: number;
}

export class ProductCourier {
    code: string;
    courierId: number;
    isUse: boolean;
    name: string;
}

export class ProductSpecification {
    attributeId: number;
    attributeValueId: number;
    name: string;
    productId: number;
    userId: number;
    value: string;
}
