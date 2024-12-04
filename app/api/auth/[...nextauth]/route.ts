import prisma from "@/app/lib/db";
import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const keycloak = KeycloakProvider({
    clientId: `${process.env.KEYCLOAK_ID}`,
    clientSecret: `${process.env.KEYCLOAK_SECRET}`,
    issuer: `${process.env.KEYCLOAK_ISSUER}`,
});

export const authOptions: AuthOptions = {
    providers: [
        keycloak
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {

            try {

                await prisma.user.upsert({
                    where: { email: profile?.email },
                    update: {
                        keycloakUserId: profile?.sub,
                        email: profile?.email,
                        fullname: profile?.name,
                        image: profile?.image,
                        // stripeCustomerId: dbUser?.stripeCustomerId ?? stripeCustomerId
                    },
                    create: {
                        keycloakUserId: profile?.sub as string,
                        email: profile?.email,
                        fullname: profile?.name,
                        image: profile?.image,
                        // stripeCustomerId: dbUser?.stripeCustomerId ?? stripeCustomerId

                    },
                });

                return true;
            } catch (error) {
                return false;
            }

        },
        async jwt({ token, account, profile }) {
            if (account) {
                token.id_token = account.id_token; // Include id_token in the token
            }

            if (account) {
                token = { ...token, access_token: account.access_token };
                token.exp = account.expires_at;
                token.id_token = account.id_token ?? '';
            }
            return token;
        },
        async session({ session, token, user }) {
            if (session) {
                session.access_token = token.access_token as string;
                session.user.id = token.sub
                session.user.keyCloakUserId = token.sub
            }
            return {
                ...session,
                token: token,
            };
        },
    },
    pages: {
        signIn: "/dashboard"
    },
    session: {
        strategy: "jwt"
    },
    events: {
        async signOut({ token }) {
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
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }