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
  role: number;

  constructor() {}
}

export class Token {
  token: string;
  message: string;
  status: string;

  constructor() {}
}
