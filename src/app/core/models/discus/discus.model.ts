export class BuyerDiscus {
  content: ContenDiscus[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}

export class ContenDiscus {
  message: string;
  userId: number;
  name: string;
  productId: number;
  since: string;
  discusId: number;
  label: string;
  imageAvatarUrl: string;
  productName: string;
  productImage: string;
  email: string;
  childs: ChildDiscus[];
}

export class ChildDiscus {
  message: string;
  userId: number;
  name: string;
  productId: number;
  since: string;
  discusId: number;
  label: string;
  imageAvatarUrl: string;
  productName: string;
  productImage: string;
  email: string;
}

export class CreateBuyerDiscusRequest {
  discusParentId: number;
  message: string;
  productId: number;
}

export class CreateBuyerDiscusResponse {
  status: number;
  message: string;
}