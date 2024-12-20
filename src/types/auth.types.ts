import { IFatSecret } from "./user.types";

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
  id: number | string;
  name?: string;
  lastName?: string;
  password?: string;
  email: string;
  avatarUrl?: string;
  provider: "credentials" | "google";
  role: "user" | "admin";
  profile: IProfile;
  fatsecret: IFatSecret;
  galery?: IGalery[];
  task?: ITask[];
  measure?: IMeasure[];
  changes?: IChanges[];
}

export interface IUserLock {
  id: number;
  name?: string;
  lastName?: string;
  email: string;
  avatarUrl?: string;
  provider: string;
  role: "user" | "admin";
  profile: IProfile;
  fatsecret: boolean;
  galery?: IGalery[];
  task?: ITask[];
  measure?: IMeasure[];
  changes?: IChanges[];
}

export interface IProfile {
  id: string;
  subscribe: boolean;
  tdee: number | null;
  bmi: number | null;
  bmr: number | null;
  userId: string;
  birthday?: Date;
}

export interface IGalery {
  id: string;
  photoUrl: string;
  createdAt: Date;
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

export interface IMeasure {
  id: string;
  createdAt: Date;
  userId: string;

  chest: string;
  arms: string;
  waist: string;
  lowerAbdomen: string;
  hips: string;
  legsUnderButtock: string;
  calves: string;
}

export interface IChanges {
  id: string;
  description: string;
  createdAt: Date;
  userId: string;

  user?: DeepPartial<IUser>;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
