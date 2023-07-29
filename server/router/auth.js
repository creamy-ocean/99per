import express from "express";
import {} from "express-async-errors";
import { verify } from "../middleware/verifier.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateCredential = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("이메일 주소를 입력해주세요"),
  body("password").notEmpty().withMessage("비밀번호를 입력해주세요"),
  validate,
];

const validateSignup = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("이메일 주소를 입력해주세요"),
  body("username")
    .trim()
    .isLength({ min: 2 })
    .withMessage("닉네임을 2글자 이상 입력해주세요"),
  body("password").notEmpty().withMessage("비밀번호를 입력해주세요"),
  body("password")
    .trim()
    .isLength({ min: 10 })
    .withMessage("비밀번호를 10글자 이상 입력해주세요"),
  body("gender").isLength({ min: 1 }).withMessage("성별을 선택해주세요"),
  validate,
];

router.post("/verify", verify, authController.verify);

router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateCredential, authController.login);

router.post("/logout", authController.logout);

router.get("/me", isAuth, authController.me);

router.get("/csrf-token", authController.csrfToken);

export default router;
