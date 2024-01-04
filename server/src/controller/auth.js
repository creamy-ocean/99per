import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as userRepository from "../data/auth.js";

export async function verify(req, res) {
  const number = req.number;
  res.status(200).json({ number });
}

export async function signup(req, res) {
  const { email, username, password, gender, birthDate, url } = req.body;
  const emailFound = await userRepository.findByEmail(email);
  const userNameFound = await userRepository.findByUsername(username);
  if (emailFound) {
    return res.status(409).json({ message: "이미 존재하는 이메일 계정입니다" });
  }
  if (userNameFound) {
    return res.status(409).json({ message: "이미 존재하는 닉네임입니다" });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    email,
    username,
    password: hashed,
    gender,
    birthDate,
    url,
  });
  const token = createJwtToken(userId);
  setToken(res, token);
  res.status(201).json({ token, username, gender, url });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  if (!user) {
    return res
      .status(401)
      .json({ message: "이메일 주소 또는 비밀번호를 다시 확인해주세요" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: "이메일 주소 또는 비밀번호를 다시 확인해주세요" });
  }
  const token = createJwtToken(user.id);
  const { username, gender } = user;
  setToken(res, token);
  res.status(200).json({ token, username, gender });
}

export async function logout(req, res) {
  setToken(res, "");
  res
    .status(200)
    .json({ message: "User has been logged out", csrfToken: undefined });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options);
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res
    .status(200)
    .json({ token: req.token, username: user.username, gender: user.gender });
}

export async function csrfToken(req, res, next) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

async function generateCSRFToken() {
  return bcrypt.hash(config.csrf.plainToken, 1);
}
