import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { decode } from 'next-auth/jwt'

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
    async signIn({ user, account, profile }) {
      console.log(user, account, profile)

      return true
    },
    async redirect({ url }) {
      // todo redirect to profile edit
      return url
    },
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode({ token }) {
    //
    // },
    async decode({ token, secret }) {
      const d = await decode({ token, secret })
      console.log(d)
      return d
    },
  },
})
