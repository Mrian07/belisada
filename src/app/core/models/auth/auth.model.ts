import { BaseResponseModel } from '@belisada/core/models';

export class Token extends BaseResponseModel {
  token: string;
}

export class RefreshToken {
  email: string;
  message: string;
  name: string;
  phone: string;
  role: number;
  status: number;
  token: string;
  type: string;
}

