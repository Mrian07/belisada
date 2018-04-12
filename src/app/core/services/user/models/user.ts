import { SendEmailTypeEnum } from './../../../enum/send-email-type.enum';
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
    isSubscribe?: boolean;

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

export class SendEmailRequest {
    email: string;
    type: SendEmailTypeEnum;
}

export class SendEmailResponse extends BaseResponseModel {

}

export class ResetPasswdRequest {
    key: string;
    newPassword: string;
}

export class ResetPasswdResponse extends BaseResponseModel {

}

export class Profile {

    name: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;

    status?: string;
    message?: string;


    regionId?: any;
    address: string;
    mcityId: number;
    cityName: string;
    countryId: number;
    countryName: string;
    districtId: number;
    districtName: string;
    idcard: string;
    imageAvatar: string;
    imageIDCard: string;
    imageNPWP: string;
    mBpartnerId: number;
    npwp: string;
    regionName: string;
    villageId: number;
    villageName: string;



}

export class EditProfileRequest {

    name: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
}

export class EditProfileResponse extends BaseResponseModel {

}
