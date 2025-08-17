import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Nodemailer from "next-auth/providers/nodemailer";
import { db } from "./db";
import { ROUTES } from "./constant";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: ROUTES.PUBLIC.LOGIN,
    signOut: ROUTES.PUBLIC.HOME,
    verifyRequest: ROUTES.PUBLIC.VERIFY,
  },
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
  },
  jwt: {
    maxAge: 15 * 60,
  },
  callbacks: {
    jwt: async ({ token, user, session }) => {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      if (session?.user?.name) {
        token.name = session.user.name;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = typeof token.id === "string" ? token.id : "";
      session.user.name = token.name;
      session.user.email = typeof token.email === "string" ? token.email : "";
      return session;
    },
  },
});
