import axios from "axios";
import axiosRetry from "axios-retry";

export default class HttpClient {
  constructor(baseURL, authErrorEventBus, getCsrfToken, config) {
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
    this.client = axios.create({
      baseURL: baseURL,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    axiosRetry(this.client, {
      retries: config.retry.retries,
      retryDelay: (retry) => {
        const delay = Math.pow(2, retry) * config.retry.initialDelayMs;
        const jitter = delay * 0.1 * Math.random();
        return delay + jitter;
      },
      // 기본적으로 axios는 네트워크 에러일 때만 retry 하기 때문에
      // 아래와 같이 status code가 429 코드일 경우에도 retry 하도록
      // retryCondition을 설정해줘야 한다
      retryCondition: (err) => {
        return (
          axiosRetry.isNetworkOrIdempotentRequestError(err) ||
          err.response.status === 429
        );
      },
    });
  }

  async fetch(url, options) {
    const { method, headers, body } = options;
    const req = {
      url,
      method,
      headers: {
        ...headers,
        "99%-csrf-token": this.getCsrfToken(),
      },
      data: body,
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (err) {
      // 에러에 response가 있다면 status code가 200대가 아니라는 의미이다
      if (err.response) {
        const data = err.response.data;
        const message =
          data && data.message ? data.message : "무언가 잘못되었습니다";
        console.log(message);
        throw new Error(message);
      }
      // 에러에 response가 없다면 네트워크 자체 에러가 발생한 것
      throw new Error("Connection error");
    }
  }
}
