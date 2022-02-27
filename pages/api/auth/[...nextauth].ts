import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import UserService from 'services/UserService'

export default NextAuth({
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'dark',
    logo: '/apple-icon.png',
  },
  pages: {
    error: '/500',
  },
  callbacks: {
    async session({ session, token }) {
      return Promise.resolve({ ...session, client: token.client })
    },
    async jwt({ token, account }) {
      const client = await UserService.findOrCreate({
        name: token.name || 'unknown',
        email: token.email,
        sub: token.sub,
        avatar: token.picture,
        provider: account?.provider,
      })

      return Promise.resolve({ ...token, client })
    },
  },
})
