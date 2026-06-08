import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { authConfig } from "@/auth.config";
import clientPromise from "@/lib/mongodb";
import { getGoogleAuthEnv, isGoogleAuthConfigured } from "@/lib/google-auth";

const { clientId, clientSecret } = getGoogleAuthEnv();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  providers: isGoogleAuthConfigured()
    ? [
        Google({
          clientId,
          clientSecret,
        }),
      ]
    : [],
  callbacks: {
    ...authConfig.callbacks,
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return `${baseUrl}/dashboard`;
    },
    jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});
