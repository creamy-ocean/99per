export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  async verify(email) {
    return this.http.fetch("/auth/verify", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });
  }

  async signup(email, username, password, gender, birthDate, url) {
    console.log(email, username, password, gender, birthDate, url);
    return this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
        gender,
        birthDate,
        url,
      }),
    });
  }

  async login(email, password) {
    return this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async me() {
    return this.http.fetch("/auth/me", {
      method: "GET",
    });
  }

  async logout() {
    return this.http.fetch("/auth/logout", {
      method: "POST",
    });
  }

  async csrfToken() {
    const resp = await this.http.fetch("/auth/csrf-token", {
      method: "GET",
    });
    return resp.csrfToken;
  }
}
