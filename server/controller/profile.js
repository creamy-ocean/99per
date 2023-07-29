import * as profileRepository from "../data/profile.js";

export async function getProfiles(req, res) {
  const { username, getAll, game, gender, age, level, interest } = req.query;
  function splitFilter(filter) {
    const split = filter.split(",");
    if (!split) {
      return;
    }
    return split;
  }
  if (username && getAll) {
    const data = await profileRepository.getAll(username);
    res.status(200).json(data);
  } else if (game || gender || age || level || interest) {
    // To-do
    // 여기 코드 똑똑하지 못함 추후 middleware로 빼야 할 것 같음
    const replaced_age = age && age.split("~");
    const replaced_level = level && splitFilter(level);
    const replaced_interest = interest && splitFilter(interest);
    const data = await profileRepository.getFiltered(
      username,
      game,
      gender,
      replaced_age ? replaced_age : undefined,
      replaced_level ? replaced_level : undefined,
      replaced_interest ? replaced_interest : undefined
    );
    res.status(200).json(data);
  } else {
    const data = await profileRepository.getAllByUsername(username);
    res.status(200).json(data);
  }
}

export async function getProfile(req, res, next) {
  const id = req.params.id;
  const profile = await profileRepository.getById(id);
  if (profile) {
    res.status(200).json(profile);
  } else {
    res.status(404).json({ message: `profile id(${id}) not found` });
  }
}

export async function createProfile(req, res, next) {
  const { game, contact, text, level, interest } = req.body;
  const profile = await profileRepository.create(
    game,
    contact,
    text,
    level,
    interest,
    req.userId
  );
  res.status(201).json(profile);
}

export async function updateProfile(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const profile = await profileRepository.getById(id);
  if (!profile) {
    return res.status(404).json({ message: `profile not found: ${id}` });
  }
  if (profile.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await profileRepository.update(id, text);
  res.status(200).json(updated);
}

export async function deleteProfile(req, res, next) {
  const id = req.params.id;
  const profile = await profileRepository.getById(id);
  if (!profile) {
    return res.status(404).json({ message: `profile not found: ${id}` });
  }
  if (profile.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await profileRepository.remove(id);
  res.sendStatus(204);
}
