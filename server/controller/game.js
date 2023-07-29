import * as gameRepository from "../data/game.js";

export async function getGames(req, res) {
  const data = await gameRepository.getAll();
  res.status(200).json(data);
}
