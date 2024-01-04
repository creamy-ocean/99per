import bcrypt from "bcrypt";
import { config } from "../config.js";

export const csrfCheck = (req, res, next) => {
  // csrf는 POST, UPDATE, DELETE 등의 요청에 대해서만 처리해주면 되므로
  // 아래의 일반적인 요청들은 패스하도록 한다.
  if (
    req.method === "GET" ||
    req.method === "OPTIONS" ||
    req.method === "HEAD"
  ) {
    return next();
  }

  const csrfHeader = req.get("99%-csrf-token");

  if (!csrfHeader) {
    console.warn(
      `"99%-csrf-token" 정보가 없는 의심스러운 요청입니다.`,
      req.headers.origin
    );
    return res
      .status(403)
      .json({ message: "비정상적인 접근입니다. 다시 시도해주세요." });
  }

  validateCsrfToken(csrfHeader)
    .then((valid) => {
      // valid의 값, 즉 bcrypt compare의 결과값은 true, false로 나누어짐
      if (!valid) {
        console.warn(
          `"99%-csrf-token" 검증에 실패한 의심스러운 요청입니다.`,
          req.headers.origin,
          csrfHeader
        );
        return res
          .status(403)
          .json({ message: "비정상적인 접근입니다. 다시 시도해주세요." });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "비정상적인 접근입니다. 다시 시도해주세요." });
    });
};

async function validateCsrfToken(csrfHeader) {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}
