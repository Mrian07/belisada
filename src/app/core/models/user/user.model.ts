import { SendEmailTypeEnum } from '@belisada/core/enum';
import { BaseResponseModel } from '@belisada/core/models';

export class UserLocalStorage {
    token: string;
}

export class UserData {
    avatar: string;
    email: string;
    name: string;
    role: number;
    storeId: number;
    id: number;
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
export class EmailChecking extends BaseResponseModel {
    email: string;
    // message?: string;
    // status?: string;
}

export class SignupResponse {
    status: number;
    msg: string;
    message?: string;
}

export class SigninRequest {
    avatar?: string;
    email: string;
    loginType?: string;
    name?: string;
    password?: string;
    socialName?: string;
    socialToken?: string;
    userType?: string;
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
    data: DataActive;
}

export class DataActive {
    token: string;
    name: string;
}

export class SendEmailRequest {
    email: string;
    type: SendEmailTypeEnum;
}

export class SendEmailResponse extends BaseResponseModel {
    name: string;
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

    imageIDCard: string;
    imageNPWP: string;
    mBpartnerId: number;
    npwp: string;
    regionName: string;
    villageId: number;
    villageName: string;

    imageAvatarUrl: string;
}


export class EditProfileRequest {

    imageAvatarUrl: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    token: string;
    oldToken;
}

export class EditProfileResponse extends BaseResponseModel {

}

export class User {
    id: number;
    username: string;
    password: string;
    fullname: string;
    lastName: string;
    email: string;
    phone: string;
}

export class UserSignupGuest {
    email: string;
    name: string;
    message?: string;
    status?: number;
    description: string;
    villageId: string;
    address: string;
    password: string;
    city?: string;
    country?: string;
}
