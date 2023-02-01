import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { createUser, getUsers } from 'shared/api'

export default NextAuth({
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    FacebookProvider({
      name: 'Meta',
      clientId: process.env.FACEBOOK_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  theme: {
    colorScheme: 'dark',
    logo: '/icons/icon-72.png',
  },
  pages: {
    error: '/500',
  },
  callbacks: {
    async session({ session, token }) {
      const { id, name, nickname, avatar } = token

      return Promise.resolve({ ...session, user: { id, name, nickname, avatar } })
    },
    async jwt({ token, account }) {
      if (!token.email) {
        return token
      }

      const fetchParams = { where: { email: token.email }, page: 0, take: 1 }
      const [candidate] = await getUsers(fetchParams)
      const { id, name, nickname, avatar } =
        candidate ||
        (await createUser({
          name: token.name || 'unknown',
          email: token.email,
          sub: token.sub,
          avatar: token.picture,
          provider: account?.provider,
        }))

      return Promise.resolve({ ...token, id, name, nickname, avatar })
    },
  },
})
