import bycrpt from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { SignInSchema } from "./lib/validations";
import prisma from "./prisma";

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
          const existedAccount = await prisma.account.findFirst({
            where: {
              providerAccountId: email,
            },
          });

          if (!existedAccount) throw new InvalidLoginError(message);

          const existedUser = await prisma.user.findFirst({
            where: {
              id: existedAccount.userId,
            },
          });

          if (!existedUser) throw new InvalidLoginError(message);

          const verifyPassword = bycrpt.compare(
            password,
            existedAccount?.password ?? "",
          );

          if (!verifyPassword) throw new InvalidLoginError(message);

          return {
            id: String(existedAccount?.userId),
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
      try {
        await prisma.$transaction(async (prismaTransactionClient) => {
          // if user is already existed.

          let userExisited = await prismaTransactionClient.user.findFirst({
            where: {
              email: userInfo.email,
            },
          });

          // otherwise, create if user is new user.
          if (!userExisited) {
            userExisited = await prismaTransactionClient.user.create({
              data: {
                name: userInfo.name,
                email: userInfo.email,
                image: userInfo.image,
              },
            });
          }

          // user existed, update name and image to reflect latest user
          // info in our  app
          else {
            await prismaTransactionClient.user.update({
              where: {
                id: userExisited.id,
              },
              data: {
                name: userInfo.name,
                image: userInfo.image,
              },
            });
          }

          // find account that asssociates with user (if any)
          const userAccount = await prismaTransactionClient.account.findFirst({
            where: {
              userId: userExisited.id,
              provider: account.provider as "github" | "google",
              providerAccountId: account.providerAccountId,
            },
          });

          if (!userAccount) {
            await prismaTransactionClient.account.create({
              data: {
                userId: userExisited.id,
                name: userInfo.name,
                image: userInfo.image,
                provider: account.provider as "github" | "google",
                providerAccountId: account.providerAccountId,
              },
            });
          }
        });

        return true;
      } catch (err) {
        return false;
      }
    },

    // modify jwt then will be avalaible in the session.
    async jwt({ token, account }) {
      if (account) {
        const existedAccount = await prisma.account.findFirst({
          where: {
            providerAccountId: account.providerAccountId,
          },
        });
        if (!existedAccount) return token;
        token.sub = String(existedAccount?.userId);
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
