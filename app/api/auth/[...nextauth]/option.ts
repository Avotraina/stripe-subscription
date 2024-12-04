import { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';


const keycloak = KeycloakProvider({
  clientId: process.env.KEYCLOAK_ID ?? '',
  clientSecret: process.env.KEYCLOAK_SECRET ?? '',
  issuer: process.env.KEYCLOAK_ISSUER,
});

export const authOptions: AuthOptions = {
  providers: [keycloak],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = { ...token, access_token: account.access_token };
        token.exp = account.expires_at;
        token.id_token = account.id_token ?? '';
      }
      return token;
    },
    async session({ token, session }) {
      if (session) {
        session.access_token = token.access_token as string;
      }
      return session;
    },
  },
  events: {
    async signOut({session, token}) {
        const { id_token } = token;
        try {
            const params = new URLSearchParams();
            params.append('id_token_hint', id_token as string);

            await fetch(`${keycloak?.options?.issuer}/protocol/openid-connect/logout?${params.toString()}`);
            
            if (typeof window !== 'undefined') window.location.href = '/login';
        } catch (error) {
            console.error('Unable to perform post-logout handshake');
        }
    },
  },
};