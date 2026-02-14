import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    user: any;
  }

  interface User {
    accessToken: string;
    userData: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    userData: any;
  }
}
