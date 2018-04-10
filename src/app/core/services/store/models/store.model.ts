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
