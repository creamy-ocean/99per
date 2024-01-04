import { db } from "../db/database.js";

export async function findByEmail(email) {
  return db
    .execute("SELECT * FROM users WHERE email = ?", [email])
    .then((result) => {
      return result[0][0];
    });
}

export async function findByUsername(username) {
  return db
    .execute("SELECT * FROM users WHERE username = ?", [username])
    .then((result) => {
      return result[0][0];
    });
}

export async function findById(id) {
  return db.execute("SELECT * FROM users WHERE id = ?", [id]).then((result) => {
    return result[0][0];
  });
}

export async function createUser(user) {
  const { email, username, password, gender, birthDate, url } = user;
  console.log(url);
  const age = new Date().getFullYear() - birthDate + 1;
  return db
    .execute(
      "INSERT INTO users (email, username, password, gender, age, url) VALUES (?, ?, ?, ?, ?, ?)",
      [email, username, password, gender, age, url]
    )
    .then((result) => {
      // result[0].insertId는 db pool promise의 result 배열 안에 있는 ResultSetHeader 객체의 insertId에 접근하는 것이다.
      // 이는 추가된 행에 대한 primary key, 즉 user의 id를 의미한다.
      return result[0].insertId;
    });
}
