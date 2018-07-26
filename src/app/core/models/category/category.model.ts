import { AttributeValue } from '@belisada/core/models/attribute/attribute.model';

export class CategoryList {
  data: Category[];
}

export class BaseCategoryModel {
  categoryId: number;
  name: string;
  nameEn: string;
  type: string;
}

export class Category extends BaseCategoryModel {
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  imageUrl5: string;
  parentId: number;
  iconUrl: string;
  childs: BaseCategoryModel[];
}

export class CategoryAttribute {
  attributeId: number;
  name: string;
  description: string;
  isMandatory: boolean;
  isInstanceAttribute: boolean;
  data: AttributeValue[];
}
