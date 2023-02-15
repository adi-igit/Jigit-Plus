import clientPromise from '@/utils/mongodb';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    //Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Github Provider
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Credential Provider
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const client = await clientPromise;
        const db = client.db('shop-db');

        //check user existence
        const result = await db
          .collection('users')
          .findOne({ email: credentials.email });
        if (!result) {
          throw new Error('No User Found with Email Please Sign Up...!');
        }

        // compare()
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        //incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error('Username or Password does not match');
        }

        return result;
      },
    }),
  ],
  secret: '1q2w3e4r5t',
});
