import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { EXPIRE_DAY_REFRESH_TOKEN, NEXT_DOMAIN, REFRESH_TOKEN_NAME } from "@/constants/global.constants";
import { userService } from "@/services/user.service";
import { GoogleAuthDto } from "@/types/auth.types";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID : "",
      clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : "",

      async profile(profile) {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile?.email) return true;

      const loginUser = await userService.getByEmail(profile.email, "google");

      if (loginUser) {
        const refreshToken = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + EXPIRE_DAY_REFRESH_TOKEN);

        const cookieStore = cookies();
        cookieStore.set(REFRESH_TOKEN_NAME, String(refreshToken), {
          httpOnly: true,
          domain: NEXT_DOMAIN,
          expires: expiresIn,
          secure: true,
          sameSite: "none",
        });

        return true;
      } else {
        const dto: GoogleAuthDto = {
          name: profile?.given_name,
          lastName: profile?.family_name,
          email: profile?.email,
          avatarUrl: profile?.picture,
        };

        const { password, ...newUser } = await userService.createGoogle(dto, "google");

        const refreshToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + EXPIRE_DAY_REFRESH_TOKEN);

        const cookieStore = cookies();
        cookieStore.set(REFRESH_TOKEN_NAME, String(refreshToken), {
          httpOnly: true,
          domain: NEXT_DOMAIN,
          expires: expiresIn,
          secure: true,
          sameSite: "none",
        });

        return true;
      }
    },
  },
});

export { handler as GET, handler as POST };
