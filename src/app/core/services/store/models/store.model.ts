import { BaseResponseModel } from '../../../models/base-response.model';

export class CreateStoreRequest {
  name: string;
  address: string;
  description?: string;
  picture?: string;
}

export class CreateStoreResponse extends BaseResponseModel {

}

export class CheckStoreRequest {
  name: string;
}

export class CheckStoreResponse extends BaseResponseModel {

}

export class DetailStoreRequest {
  id: string;
}

class DetailStoreData {
  name: string;
  address: string;
  description?: string;
  picture?: string;
}

export class DetailStoreResponse {
  status: number;
  message?: string;
  data?: DetailStoreData;
}

export class UpdateStoreRequest extends DetailStoreData {

}
export class UpdateStoreResponse extends BaseResponseModel {

}

export class OpenStoreResponse extends BaseResponseModel {

}
