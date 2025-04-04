import handleError from "./error-handler";
import { RequestError } from "./http-erros";

interface FetchOptions extends RequestInit {
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {},
): Promise<ActionResponse<T>> {
  const {
    timeout = 10000,
    maxRetries = 3,
    retryDelay = 1000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  let attemps = 0;
  while (attemps < maxRetries) {
    // create abort controller
    const controller = new AbortController();

    // create timer that stops the fetch request after the timeout  (5s)
    const timerId = setTimeout(() => controller.abort(), timeout);

    // let us set up our headers
    const headersConfig: HeadersInit = {
      ...customHeaders,
      "Content-Type": "application/json",
      accept: "application/json",
    };

    // config file for all fetch requests
    const config: RequestInit = {
      ...restOptions,
      headers: headersConfig,
      signal: controller.signal,
    };
    try {
      const response = await fetch(url, config);

      // succesfully fetch the data then clear timeout
      clearTimeout(timerId);

      // if there is not data.
      if (!response.ok) {
        throw new RequestError(
          response.status,
          `HTTP error : ${response.statusText}`,
        );
      }
      return response.json();
    } catch (error) {
      clearTimeout(timerId);
      if (attemps === maxRetries - 1) {
        return handleError("server", error) as ErrorResponse;
      }
      await new Promise((resolve) =>
        setTimeout(resolve, retryDelay * (attemps + 1)),
      );
      attemps++;
    }
  }
  return handleError("server", "Max Retries Exceeded") as ErrorResponse;
}
