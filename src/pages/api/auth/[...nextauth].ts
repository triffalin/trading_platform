import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

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
  // Configure other NextAuth options here such as database, callbacks, etc.
  callbacks: {
    async signIn({ account, profile }) {
      if (
        account &&
        (account.provider === 'google' || account.provider === 'facebook')
      ) {
        // Logic here is safe to execute because account is not null
        return true;
      }
      return false; // If account is null, you might want to handle it differently
    },
    async session({ session, token, user }) {
      // You can safely add properties to session here
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin', // Define custom sign-in page route
    error: '/auth/error' // Error handling route
  }
});
