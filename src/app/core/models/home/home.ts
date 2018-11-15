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
