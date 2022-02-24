import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { LOGIN_IN_ROUTE } from 'route'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  theme: {
    colorScheme: 'dark',
    logo: '/apple-icon.png',
  },
  pages: {
    signIn: LOGIN_IN_ROUTE,
    error: '/500',
  },
})
