import { db } from "../db/database.js";

// 여러 함수에서 반복적으로 사용되는 query를 변수로 저장해둔다.
const SELECT_JOIN =
  "SELECT fr.id, fr.contact, fr.interest, fr.level, fr.text, fr.userId, fr.createdAt, us.username, us.gender, us.url FROM friends as fr JOIN users as us ON fr.userId=us.id";
const ORDER_DESC = "ORDER BY fr.createdAt DESC";

export async function getAll(username) {
  return db
    .execute(
      `${SELECT_JOIN} WHERE username NOT IN ('${username}') ${ORDER_DESC}`
    ) //
    .then((result) => result[0]);
}

export async function getFiltered(
  username,
  game,
  gender,
  age,
  level,
  interest
) {
  const gameId =
    game && (await db.execute(`SELECT id FROM games WHERE title='${game}'`));
  const id = gameId[0].map((g) => g.id).join();
  return db
    .execute(
      `${SELECT_JOIN} WHERE username NOT IN ('${username}')
      ${gameId ? `AND gameId = '${id}'` : ""}
      ${gender ? `AND gender = '${gender}'` : ""}
      ${age ? `AND (age BETWEEN ${age[0]} AND ${age[1]})` : ""}
      ${
        level
          ? `AND level IN (${
              level.length === 1
                ? `'${level}'`
                : `${level
                    .map((l) => {
                      return `'${l}'`;
                    })
                    .join(",")}`
            })`
          : ""
      } ${
        interest
          ? `AND JSON_CONTAINS(interest,${
              interest.length === 1
                ? `'["${interest}"]'`
                : `'[${interest
                    .map((i) => {
                      return `"${i}"`;
                    })
                    .join(",")}]'`
            } )`
          : ""
      }
      ${ORDER_DESC} `.replace(/\s{2,}/gi, " ")
    )
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE fr.id=? ${ORDER_DESC}`, [id]) //
    .then((result) => result[0][0]);
}

// profile 작성 후 getById()를 통해 해당 트윗 리턴
export async function create(game, contact, text, level, interest, userId) {
  const gameId = await db.execute(`SELECT id FROM games WHERE title='${game}'`);
  console.log(gameId);
  gameId[0].forEach(async (game) => {
    return db
      .execute(
        "INSERT INTO friends (text, contact, level, interest, createdAt, userId, gameId) VALUES(?, ?, ?, ?, ?, ?, ?)",
        [text, contact, level, interest, new Date(), userId, game.id]
      )
      .then((result) => getById(result[0].insertId));
  });
}

// profile 수정 후 getById()를 통해 해당 트윗 리턴
export async function update(id, text) {
  return db
    .execute("UPDATE friends SET text = ? WHERE id = ?", [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute("DELETE FROM friends WHERE id = ?", [id]);
}
