import { BaseResponseModel } from '../../../models/base-response.model';

export class CreateStoreRequest {

    name: string;
    address: string;
    description: string;
}

export class CreateStoreResponse extends BaseResponseModel {

}
