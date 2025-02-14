import bycrpt from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { API } from "./lib/api";
import { SignInSchema } from "./lib/validations";

const message = "Invalid Crendentials, Please check your email and password";
class InvalidLoginError extends CredentialsSignin {
  constructor(public code: string) {
    super(code);
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const validate = SignInSchema.safeParse(credentials);
        if (validate.success) {
          const { email, password } = validate.data;

          const { data: existedUserAccount, success: accountSuccess } =
            await API.accounts.getProviderByProviderAccountId(email);

          if (!accountSuccess) throw new InvalidLoginError(message);

          const { data: existedUser, success: userSuccess } =
            await API.users.getUserById(String(existedUserAccount?.userId));

          if (!userSuccess) throw new InvalidLoginError(message);

          const verifyPassword = bycrpt.compare(
            password,
            existedUserAccount?.password ?? "",
          );

          if (!verifyPassword) throw new InvalidLoginError(message);

          return {
            id: String(existedUserAccount?.userId),
            name: existedUser?.name ?? "",
            email,
            image: existedUser?.image ?? null,
          };
        }
        return null;
      },
    }),

    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;
      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
      };

      const { success } = await API.auth.authenticateWithOAuth({
        user: {
          email: userInfo.email,
          name: userInfo.name,
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
