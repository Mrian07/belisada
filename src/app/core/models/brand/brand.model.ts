export class BrandList {
    dataCount: number;
    pageCount: number;
    data: Brand[];
}

export class Brand {
    brandId: number;
    name: string;
    imageUrl: string;
    isActive: boolean;
}

export class BrandHomeResponse {
    content: Brand[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
}
