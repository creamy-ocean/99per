import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import { config } from "../src/config.js";

const AUTH_ERROR = { message: "비정상적인 접근입니다. 다시 시도해주세요." };

export const isAuth = async (req, res, next) => {
  // request에 authorization 헤더가 존재하는지 확인한다
  // (브라우저가 아닌 클라이언트들은 쿠키를 사용하지 않기 때문에 authorization 헤더 사용)
  let token;
  const authHeader = req.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 헤더에 토큰이 없으면 request의 쿠키를 확인한다
  if (!token) {
    token = req.cookies["token"];
  }

  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id; // req.customData
    next();
  });
};
