export class ListReview {
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

export class ListReviewReq {
    message: string;
    productId: number;
    reviewParentId: number;
    star: number;
    title: string;
}

