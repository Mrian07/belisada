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
  status: string;
  data: SearchBarData[];
  keyWord: string;
  categoryId: number;
  categoryName: string;
}

export class SearchBarData {
  productId: number;
  name: string;
  brandId: number;
  brandName: string;
  imageUrl: string[];
  price: number;
}

export class SearchFiler {
  filter: string;
  data: DataFilter[];
}

export class DataFilter {
  filterCount: number;
  type: string;
  min: number;
  max: number;
  filterId: number;
  filterName: string;
}

export class Location {
  dataCount: number;
  pageCount: number;
  data: DataLocation[];
}

export class DataLocation {
  // cityId: number;
  // cityName: string;
  filterCount: number;
  filterId: number;
  filterName: string;
}

