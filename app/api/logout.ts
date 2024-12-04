import { signOut as nextAuthSignOut } from "next-auth/react";

export const signOut = async () => {
  // First, call next-auth's signOut to clear the session locally
  await nextAuthSignOut({ redirect: false });

  // Redirect the user to Keycloak's logout endpoint
  const keycloakLogoutUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent('<your-redirect-url>')}`;
  // Redirect the user to Keycloak logout
  window.location.href = keycloakLogoutUrl;
};