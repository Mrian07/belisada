export class Home {
    content: HomeContent[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
}

export class HomeContent {
    productId: number;
    name: string;
    sku: string;
    brandId: number;
    brandName: string;
    storeId: number;
    storeName: string;
    storeUrl: string;
    storeImageUrl: string;
    pricelist: number;
    rate: number;
    review: number;
    imageUrl: string;
    locationId: number;
    locationName: string;
    originId: number;
    brandImageUrl: string;
    qty: number;
    discount: number;
    specialPrice: number;
    weight: number;
    fixPrice: number;
}

export class FlashSaleResponse {
    content: FlashSaleContent[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
}

export class FlashSaleContent {
    productId: number;
    name: string;
    sku: string;
    brandId: number;
    brandName: string;
    storeId: number;
    storeName: string;
    storeUrl: string;
    storeImageUrl: string;
    pricelist: number;
    rate: number;
    review: number;
    imageUrl: string;
    locationId: number;
    locationName: string;
    originId: number;
    brandImageUrl: string;
    qty: number;
    leftQty: number;
    discount: number;
    specialPrice: number;
    weight: number;
    fixPrice: number;
}

export class FlashSaleExpiredResponse {
    status: number;
    message: string;
    data: FlashSaleExpiredData;
}

export class FlashSaleExpiredData {
    expiredTime: number;
    expiredDate: string;
}
