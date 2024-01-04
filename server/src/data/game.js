import { db } from "../db/database.js";

export async function getAll() {
  return db
    .execute(`SELECT * FROM games`) //
    .then((result) => result[0]);
}
