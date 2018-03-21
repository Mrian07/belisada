export class SignupData {
    name: string;
    email: string;
    phone: string;
    password: string;
    news_feed?: boolean;

    constructor() {}
}

export class SignupResponse {
    status: number;
    msg: string;
}