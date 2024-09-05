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
  profile: IProfile;
}

export interface IProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  subscribe: boolean;
  tdee: number | null;
  bmi: number | null;
  bmr: number | null;
  userId: string;
}
