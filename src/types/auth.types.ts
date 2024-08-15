export interface AuthDto {
  email: string;
  password: string;
}

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface IUser {
  id: number;
  name?: string;
  email: string;
}
