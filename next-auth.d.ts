import { Profile } from "next-auth";

declare module "next-auth" {
  interface Profile {
    sub: string;
    name: string;
    email: string;
    picture: string;
    given_name: string;
    family_name: string;
  }
}
