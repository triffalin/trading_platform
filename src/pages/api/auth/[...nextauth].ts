import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { Session } from 'next-auth';

// Define a custom User interface
interface User {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

declare module 'next-auth' {
  interface Session {
    user?: User;
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ account, user, profile }) {
      if (!account) return false; // Handles the case where account might be null
      return true; // Allows signIn for configured providers
    },
    async session({ session, token }) {
      // Optionally add custom properties to the session here
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  }
});
