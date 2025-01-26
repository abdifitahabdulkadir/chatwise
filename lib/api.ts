import { fetchHandler } from "./fetch-handler";

const BASE_URL = `${process.env.BASE_URL}/api`;
export const API = {
  auth: {
    async authenticateWithOAuth({
      user,
      provider,
      providerAccountId,
    }: SignInWithOAuthProps) {
      const result = await fetchHandler(`${BASE_URL}/auth/social-media`, {
        method: "POST",
        body: JSON.stringify({ user, provider, providerAccountId }),
      });
      console.log(result);
      return result;
    },
  },
  accounts: {
    getProviderById(providerId: string) {
      return fetchHandler<AccountI>(`${BASE_URL}/accounts/${providerId}`, {
        method: "GET",
      });
    },
  },
};
