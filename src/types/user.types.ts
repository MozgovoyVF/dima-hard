import { IProfile } from "./auth.types";

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
  profile: IProfile;
}
