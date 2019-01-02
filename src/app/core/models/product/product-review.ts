export class IsiReview {
    content: ProductReviewResponse[];
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export class ProductReviewResponse {
    email: string;
    imageAvatarUrl: string;
    isactive: true;
    label: string;
    message: string;
    name: string;
    productId: number;
    productImage: string;
    productName: string;
    reviewId: number;
    reviewParentId: number;
    since: string;
    sku: string;
    star: number;
    title: string;
    userId: number;
}

export class ProductReviewContent {
    message: string;
    productId: number;
    reviewParentId: number;
    star: number;
    title: string;
}
