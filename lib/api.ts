import { fetchHandler } from "./fetch-handler";

const BASE_URL = `${process.env.BASE_URL}/api`;
export const API = {
  auth: {
    async authenticateWithOAuth({
      user,
      provider,
      providerAccountId,
    }: SignInWithOAuthProps) {
      return fetchHandler(`${BASE_URL}/auth/social-media`, {
        method: "POST",
        body: JSON.stringify({ user, provider, providerAccountId }),
      });
    },
  },
  accounts: {
    getProviderById(providerId: string) {
      return fetchHandler<AccountI>(`${BASE_URL}/auth/accounts/${providerId}`, {
        method: "GET",
      });
    },
    async getProviderByProviderAccountId(providerAccountId: string) {
      console.log("Base url is : ", BASE_URL);
      const result = await fetchHandler<AccountI>(
        `${BASE_URL}/auth/accounts/providerAccountId`,
        {
          method: "POST",
          body: JSON.stringify({ providerAccountId }),
        },
      );
      return result;
    },
  },
  users: {
    getUserById(id: string) {
      return fetchHandler<UserI>(`${BASE_URL}/auth/users/${id}`, {
        method: "GET",
      });
    },
  },
};
