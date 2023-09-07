import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import VkProvider from 'next-auth/providers/vk'
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
    VkProvider({
      clientId: process.env.VK_CLIENT_ID || '',
      clientSecret: process.env.VK_CLIENT_SECRET || '',
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
      if (!account) {
        return token
      }

      const authId = `${account?.provider}-${token.sub}`
      const [candidate] = await getUsers({
        where: token.email ? { email: token.email } : { authId },
        page: 0,
        take: 1,
      })
      const { id, name, nickname, avatar } =
        candidate ||
        (await createUser({
          authId,
          name: token.name || 'anonymous',
          email: token.email || null,
          avatar: token.picture || null,
        }))

      return Promise.resolve({ ...token, id, name, nickname, avatar })
    },
  },
})
