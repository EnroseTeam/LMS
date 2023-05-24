import { CookieOptions, SessionOptions } from "express-session";
import env from "./validateEnv";
import MongoStore from "connect-mongo";

const cookieConfig: CookieOptions = {
  maxAge: 60 * 60 * 1000,
};

if (env.NODE_ENV === "production") {
  cookieConfig.secure = true;
  cookieConfig.sameSite = "none";
  cookieConfig.httpOnly = false;
  cookieConfig.domain = ".e-cpta.mn";
}

const sessionConfig: SessionOptions = {
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: cookieConfig,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING,
  }),
};

export default sessionConfig;
