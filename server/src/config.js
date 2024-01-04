import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC")),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS")),
  },
  db: {
    host: required("DB_HOST"),
    port: required("DB_PORT"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
  },
  port: parseInt(required("PORT")),
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  csrf: {
    plainToken: required("CSRF_SECRET_KEY"),
  },
  rateLimit: {
    windowMs: required("WINDOW_MS"),
    maxRequest: required("MAX_REQUEST"),
  },
  nodeMailer: {
    user: required("NODE_MAILER_USER"),
    password: required("NODE_MAILER_PASSWORD"),
  },
};
