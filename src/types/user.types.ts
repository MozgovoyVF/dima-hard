import { IGalery, IProfile, ITask } from "./auth.types";

export interface UserDto {
  email?: string;
  name?: string;
  password?: string;
}

export interface IProfileUser {
  id: number;
  name?: string;
  lastName?: string;
  email: string;
  avatarUrl?: string;
  role: "user" | "admin";
  profile: IProfile;
  fatsecret: IFatSecret;
  provider?: "credentials" | "google";
  galery?: IGalery[];
  task?: ITask[];
}

export interface IFatSecret {
  id: string;

  token?: string;
  secret?: string;
}
