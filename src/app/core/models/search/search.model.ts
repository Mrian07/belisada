export class ListSearch {
  content: ContentSearch[];
  totalPages: number;
  totalElements: number;
  sort: SortSearch[];
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}

export class ContentSearch {
  productId: number;
  name: string;
  sku: string;
  brandId: number;
  brandName: string;
  storeId: string;
  storeName: string;
  storeUrl: string;
  pricelist: number;
  discount: number;
  rate: number;
  review: number;
  imageUrl: string;
  locationId: number;
  locationName: string;
  id: any;
}

export class SortSearch {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
  descending: boolean;
}

export class SearchBarResponse {
  keyWord: string;
  categoryId: number;
  categoryName: string;
}
