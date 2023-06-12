import { prisma } from "@/server/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import { LoginSchema } from "@/types";
import { type GetServerSidePropsContext } from "next";
import { env } from "@/env.mjs";
import { compare } from "@/lib/crypto";
// import { getCredential } from "./credentialsProviders";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: getCredential().google.clientId,
    //   clientSecret: getCredential().google.clientSecret,
    // }),
    // GithubProvider({
    //   clientId: getCredential().github.clientId,
    //   clientSecret: getCredential().github.clientSecret,
    // }),
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Insert Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, _req) {
        console.log(
          "🚀 ~ file: auth.ts:77 ~ authorize ~ credentials:",
          credentials
        );

        /**
         * verificamos que tenemos las credentials
         */
        const { email, password } = LoginSchema.parse(credentials);
        if (!email && !password) {
          throw new Error("Email and password is required");
        }
        /**
         * cheked user existing
         */

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error("User not found");
        }
        /**
         * compare password and passwordHash
         */
        const verifyPassword = compare(password, user.password);
        if (!verifyPassword) {
          throw new Error("Credentials does not match!");
        }

        return user;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "auth/login",
  },
  secret: env.NEXTAUTH_SECRET,

  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accesstoken = account.access_token;
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      console.log(
        "🚀 ~ file: auth.ts:107 ~ export  authOptions: NextAuthOptions.callbacks.session:",
        session
      );
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
// getServerSession(req, res, authOptions)
