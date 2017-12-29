export class Product {

  pricelist: number;
  productId: number;
  mBpartnerStoreId: number;
  description: string;
  message?: string;
  status?: string;

  constructor() {}
}

export class SellerProduct {
  productId: number;
  name: string;
  nameEn: string;
  highlight: string;
  highlightEn: string;
  description: string;
  descriptionEn: string;
  mProductCategoryId: number;
  imageurl: string;
  imageurl2: string;
  imageurl3: string;
  imageurl4: string;
  imageurl5: string;
  isverified: string;
  verifiednote: string;
  verifieddate: any;
  pricelist: number;
  mBpartnerStoreId: number;
  qcdate: any;
  isqcpass: string;
  qcnote: string;
  ispublished: string;
  publisheddate: any;
  publishednote: string;
  category3Id: number;
  category3Name: string;
  category2Id: number;
  category2Name: string;
  category1Id: number;
  category1Name: string;
  productbrandId: number;
  brandname: string;
}
