export class Login {

  email: string;
  password: string;
  status: string;
  message: string;
  user: string;

  constructor() {}
}

export class LoginData {
  name?: string;
  username: string;
  token: string;
  isCorporate: string;
  isCustomer: string;
  isSeller: string;

  constructor() {}
}

export class Token {
  token: string;
  message: string;
  status: string;

  constructor() {}
}
