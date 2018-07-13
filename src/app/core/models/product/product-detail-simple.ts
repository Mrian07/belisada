export class ProductDetailSimple {
    name: string;
    brandName: string;
    storeId: number;
    storeName: string;
    storeUrl: string;
    storeImageUrl: string;
    pricelist: number;
    discount: number;
    imageUrl: string;
    locationId: number;
    locationName: string;
    iStock: Boolean;
    qtyTypeValue: string;
    qtyType: string;
    categoryOneId: number;
    categoryOneName: string;
    categoryTwoId: number;
    categoryTwoName: string;
    categoryThreeId: number;
    categoryThreeName: string;
    weight: number;
    dimensionsWidth: number;
    dimensionslength: number;
    dimensionsheight: number;
}

export class ProductSimple {
    data: ProductDetailSimple;
    message: string;
    status: number;
}
