import { BaseResponseModel } from '../../../models/base-response.model';

export class UserLocalStorage {
    token: string;
}

export class UserData {
    avatar: string;
    email: string;
    name: string;
    role: number;
}

export class SignupData {
    name: string;
    email: string;
    phone: string;
    password: string;
    news_feed?: boolean;

    constructor() {}
}
export class EmailChecking {
    email: string;
    message?: string;
    status?: string;
}

export class SignupResponse {
    status: number;
    msg: string;
    message?: string;
}

export class SigninRequest {
    email: string;
    password: string;

    constructor() {}
}

export class SigninResponse extends BaseResponseModel {
    name: string;
    email: string;
    role: number;
    phone: string;
    token: string;
}

export class ActivationRequest {
    key: string;
}

export class ActivationResponse extends BaseResponseModel {

}
