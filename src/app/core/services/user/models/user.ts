export class SignupData {
    f_name: string;
    email: string;
    hp: string;
    password: string;
    news_feed: boolean;

    constructor() {}
}

export class SignupResponse {
    status: number;
    msg: string;
}