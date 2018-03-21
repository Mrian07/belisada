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

export class SigninRequest {
    email: string;
    password: string;

    constructor() {}
}

export class SigninResponse {
    name: string;
    email: string;
    role: number;
    phone: string;
    token: string;
}
