// 외부 모듈
import express, { urlencoded } from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// 내부 모듈
import profilesRouter from "./router/profiles.js";
import authRouter from "./router/auth.js";
import gamesRouter from "./router/games.js";
import { config } from "./config.js";
import { db } from "./db/database.js";
// import { csrfCheck } from "./middleware/csrf.js";
import rateLimit from "./middleware/rate-limiter.js";

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));
app.use(rateLimit);

// app.use(csrfCheck);
app.use("/profiles", profilesRouter);
app.use("/auth", authRouter);
app.use("/games", gamesRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

db.getConnection().then((connection) => console.log);
app.listen(config.port);
