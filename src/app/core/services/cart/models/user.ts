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

}
