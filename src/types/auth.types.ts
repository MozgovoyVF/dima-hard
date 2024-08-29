export interface AuthDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export interface GoogleAuthDto {
  email: string;
  avatarUrl?: string;
  name?: string;
  lastName?: string;
}

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  email: string;
  password: string;
  name: string;
  lastName: string;
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
