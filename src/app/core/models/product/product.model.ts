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

export class ProductDetail {
  status: number;
  message: string;
  data: ProductDetailList;
}

export class ProductDetailList {
  status: number;
  message: string;
  storeImageUrl: string;
  productId: number;
  name: string;
  nameEn: string;
  highlight: string;
  highlightEn: string;
  description: string;
  masterId: any;
  descriptionEn: string;
  sku: string;
  brandId: number;
  brandName: string;
  createdDate: string;
  storeId: number;
  storeName: string;
  storeUrl: string;
  weight: number;
  volume: number;
  dimensionsWidth: number;
  dimensionslength: number;
  dimensionsheight: number;
  isactive: string;
  classification: number;
  classificationValue: string;
  qty: number;
  categoryOneId: number;
  categoryOneName: string;
  categoryTwoId: number;
  categoryTwoName: string;
  categoryThreeId: number;
  categoryThreeName: string;
  imageUrl: string[];
  pricelist: number;
  couriers: Couriers[];

  isGuarantee: boolean;
  guaranteeType: string;
  guaranteeTypeValue: string;
  guaranteeTime: string;
  guaranteeTimeValue: string;
  pricelistlast: number;

  specification: Specification[];
  seen: number;
  sold: number;
  value: string;
  rate: number;
  review: number;
  discount: number;
  isPublished: boolean;
  locationId: number;
  locationName: string;
  id: string;
  moreInformation: MoreInformation;
  brandImageUrl: any;
  specialPrice: number;
}

export class ProductDetailV2Spec {
  attributeId: number;
  name: string;
  attributeValueId: number;
  value: string;
}

export class ProductDetailV2Variant {
  attributeId: number;
  name: string;
  varians: ProductDetailV2VariantValue[];
}

export class ProductDetailV2VariantValue {
  attributeValueId: number;
  value: string;
}

export class ProductDetailV2Store {
  status: number;
  message: string;
  data: ProductDetailV2StoreData;
}

export class ProductDetailV2StoreData {
  lastOnline: string;
  productSold: number;
  productQuantity: number;
  transactionSuccess: number;
  storeImageUrl: string;
  isoffday: boolean;
  storeUrl: string;
  locationId: number;
  locationName: string;
  originId: number;
  storeName: string;
  storeId: number;
}

export class ProductDetailV2Price {
  status: number;
  message: string;
  data: ProductDetailV2PriceData;
}

export class ProductDetailV2PriceData {
  isDetail: boolean;
  range: {
    productId: number;
    min: number;
    max: number;
    discount: number;
    specialPrice: number;
  };
}

export class ProductDetailV2 {
  status: number;
  message: string;
  data: ProductDetailV2Data;
}

export class ProductDetailV2Data {
  productId: number;
  name: string;
  nameEn: string;
  highlight: string;
  highlightEn: string;
  description: string;
  sku: string;
  brandId: number;
  brandName: string;
  storeId: number;
  weight: number;
  dimensionsWidth: number;
  dimensionslength: number;
  dimensionsheight: number;
  classification: string;
  classificationValue: string;
  qtyType: string;
  qtyTypeValue: string;
  qty: number;
  status: string;
  statusCode: string;
  categoryOneId: number;
  categoryOneName: string;
  categoryTwoId: number;
  categoryTwoName: string;
  categoryThreeId: number;
  categoryThreeName: string;
  imageUrl: string[];
  pricelist: number;
  couriers: Couriers[];
  isGuarantee: boolean;
  guaranteeType: number;
  guaranteeTypeValue: string;
  guaranteeTime: number;
  guaranteeTimeValue: string;
  specification: Specification[];
  // categorys: [];
  discount: number;
  specialPrice: number;
  masterId: number;
  fromMaster: boolean;
  masterVarianId: number;
  useVarian: boolean;
}

export class Specification {
  name: string;
  value: string;
}

export class Couriers {
  courierId: number;
  name: string;
  code: string;
  imageUrl: string;
}

export class MoreInformation {
  lastOnline: string;
  productSold: number;
  productQuantity: number;
  transactionSuccess: number;
  storeImageUrl: string;
  isoffday: boolean;
}

export class Filter {
  content: FilterContent[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: FilterSort;
  totalElements: number;
  totalPages: number;
}

export class FilterSort {
  ascending: boolean;
  descending: boolean;
  direction: string;
  ignoreCase: boolean;
  nullHandling: string;
  property: string;
}

export class FilterContent {
  brandId: number;
  brandImageUrl: string;
  brandName: string;
  discount: number;
  id: number;
  imageUrl: string;
  locationId: number;
  locationName: string;
  name: string;
  originId: number;
  pricelist: number;
  productId: number;
  qty: number;
  rate: number;
  review: number;
  sku: number;
  specialPrice: number;
  storeId: number;
  storeImageUrl: string;
  storeName: string;
  storeUrl: string;
  weight: number;
}


export class FilterOffers {
  filter: string;
  data: DataFilter[];
}

export class DataFilter {
  filterCount: number;
  filterName: string;
  filterId: number;
  code: string;
  name: string;
}

export class Isi {
  content: Content[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export class Content {
  message: string;
  userId: number;
  productId: number;
  since: string;
  discusParentId: number;
  discusId: number;
  label: string;
  name: string;
  childs: Child[];
}

export class Child {
  discusId: number;
  label: string;
  message: string;
  name: string;
  since: string;
  userId: string;
}

export class CreateDiscus {
  discusParentId: number;
  message: string;
  productId: string;
}

