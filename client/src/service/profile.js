export default class ProfileService {
  constructor(http) {
    this.http = http;
  }

  async getGames() {
    return this.http.fetch("/games", {
      method: "GET",
    });
  }

  async getProfiles({ username, getAll }) {
    const query = getAll ? `${username}&getAll=${getAll}` : `${username}`;
    return this.http.fetch(`/profiles/?username=${query}`, {
      method: "GET",
    });
  }

  async postProfile(values, interest) {
    const { game, contact, text, level } = values;
    return this.http.fetch(`/profiles`, {
      method: "POST",
      body: JSON.stringify({ game, contact, text, level, interest }),
    });
  }

  async deleteProfile(profileId) {
    return this.http.fetch(`/profiles/${profileId}`, {
      method: "DELETE",
    });
  }

  async updateProfile(profileId, text) {
    return this.http.fetch(`/profiles/${profileId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }

  async filterProfiles(filters, username, gender) {
    let query = "";
    let prev = "";
    filters.forEach((filter) => {
      let { type, content } = filter;
      if (type === "gender") {
        content = gender;
      }
      if (prev === type) {
        query = query.slice(0, -1);
        query += `,${content}&`;
      } else {
        query += `${type}=${content}&`;
      }
      prev = type;
    });
    if (query.charAt(query.length - 1) === "&") {
      query = query.slice(0, -1);
    }
    return this.http.fetch(`/profiles/?username=${username}&${query}`, {
      method: "GET",
    });
  }
}
