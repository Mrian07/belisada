import { PriceAndStock } from '@belisada/core/models/product/price-and-strock.model';
import { Delivery } from '@belisada/core/models/product/delivery.model';

export class Product {
  pictures: string[] = [];
  name: string;
  brand: string;
  category: string;
  description: string;
  specs: any[];
  priceandstock: PriceAndStock;
  delivery: Delivery;
}

export class AddProductRequest {
  brandId: number;
  brandName: string;
  categoryThreeId: number;
  classification: string;
  couriers: string[];
  description: string;
  descriptionEn: string;
  dimensionsWidth: number;
  dimensionsheight: number;
  dimensionslength: number;
  guaranteeTime: string;
  guaranteeType: string;
  highlight: string;
  highlightEn: string;
  imageUrl: string[];
  isGuarantee: boolean;
  name: string;
  nameEn: string;
  pricelist: number;
  qtyType: string;
  specification: ProductSpecification[];
  volume: number;
  weight: number;
}

export class AddProductResponse {
  status: number;
  message: string;
}

export class ProductCourier {
  code: string;
  courierId: number;
  isUse: boolean;
  name: string;
}

export class ProductSpecification {
  attributeId: number;
  attributeValueId: number;
  value: string;
}


export class ProductSearch {
  content: ProductContent[];
  totalPages: number;
  totalElements: number;
  sort: ProductSort[];
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}

export class ProductContent {
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

export class ProductSort {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
  descending: boolean;
}
