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
}
