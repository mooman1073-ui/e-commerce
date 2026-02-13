import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserResponse } from "@/interfaces/login";

type LoginResponse = {
  message: string;
  token: string;
  user: UserResponse;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const payload: LoginResponse = await response.json();

        if (!response.ok || !payload.token) return null;

        return {
          id: payload.user._id,
          name: payload.user.name,
          email: payload.user.email,
          accessToken: payload.token,
          userData: payload.user,
        } as any;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.userData = (user as any).userData;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).token = token.accessToken;
      (session as any).user = token.userData;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.AUTH_SECRET,
};
