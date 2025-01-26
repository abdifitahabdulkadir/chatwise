import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { API } from "./lib/api";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;
      console.log("here");
      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === "github"
            ? String(profile?.login)
            : user?.name?.toLowerCase(),
      };

      const { success } = await API.auth.authenticateWithOAuth({
        user: {
          email: userInfo.email,
          name: userInfo.name,
          username: userInfo.username || userInfo.name,
          image: userInfo.image,
        },
        provider: account.provider as "github" | "google",
        providerAccountId: account.providerAccountId,
      });
      if (!success) return false;
      return true;
    },

    // modify jwt then will be avalaible in the session.
    async jwt({ token, account }) {
      if (account) {
        const { data: accountHolderData, success } =
          await API.accounts.getProviderById(account.providerAccountId);
        if (!success) return token;
        token.sub = String(accountHolderData?.userId);
      }
      return token;
    },

    // we are getting current modified token id and add tothe session
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
});
