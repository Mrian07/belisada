export class ProductReviewResponse {
    content: ProductReviewContent[];
    last: Boolean;
    totalPages: number;
    totalElements: number;
    first: Boolean;
    numberOfElements: number;
    size: number;
    number: number;
}

export class ProductReviewContent {
    message: string;
    star: number;
    userId: number;
    productId: number;
    since: string;
}
