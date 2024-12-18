import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    access_token?: string
    keyCloakUserId?: string
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}