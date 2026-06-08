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
    session({ session, user }) {
      if (session.user) {
        session.user.email = user.email;
        session.user.name = user.name;
        session.user.image = user.image;
      }
      return session;
    },
  },
});
