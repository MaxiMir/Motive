import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

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
})
