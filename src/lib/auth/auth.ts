import { env } from '@/env.mjs'
import { prisma } from '@/server/db'
import { ICredentials } from '@/type'
import { compare } from '@/utils/crypto'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// import GoogleProvider from 'next-auth/providers/google'
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    // GoogleProvider({
    //   clientId: getGoogleCredentials().clientId,
    //   clientSecret: getGoogleCredentials().clientSecret,
    // }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, _req) {
        console.log(
          '🚀 ~ file: auth.ts:32 ~ authorize ~ credentials:',
          credentials
        )
        /**
         * verificamos que tenemos las credentials
         */
        const { email, password } = credentials as ICredentials
        if (!email && !password) {
          throw new Error('Email and password is required')
        }
        /**
         * cheked user existing
         */
        console.log('antes de la consulta a la db')

        const user = await prisma.user.findUnique({
          where: { email },
        })
        console.log('🚀 ~ file: auth.ts:46 ~ authorize ~ user:', user)
        if (!user) {
          throw new Error('User not found')
        }
        /**
         * compare password and passwordHash
         */
        const verifyPassword = compare(password, user.password)
        if (!verifyPassword) {
          throw new Error('Credentials does not match!')
        }

        return user
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
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      console.log('🚀 ~ file: auth.ts:80 ~ jwt ~ token:', token)

      if (!token.sub) return token

      const dbUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      })

      if (!dbUser) {
        throw new Error('User not found')
      } else {
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          role: dbUser.role,
        }
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
  },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
// export const getServerAuthSession = (ctx: {
//   req: GetServerSidePropsContext['req']
//   res: GetServerSidePropsContext['res']
// }) => {
//   return getServerSession(ctx.req, ctx.res, authOptions)
// }
