import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import { MulterError } from "multer";
import session from "express-session";

import env from "./configs/validateEnv";

import fileRoutes from "./routes/file";
import courseLevelRoutes from "./routes/courseLevel";
import courseCategoryRoutes from "./routes/courseCategory";
import courseLessonRoutes from "./routes/courseLesson";
import userRoleRoutes from "./routes/userRole";
import userRoutes from "./routes/user";
import courseReviewRoutes from "./routes/courseReview";
import courseRoutes from "./routes/course";
import authRoutes from "./routes/auth";
import courseSectionRoutes from "./routes/courseSection";
import MongoStore from "connect-mongo";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

// Routes
app.use("/api/files", fileRoutes);
app.use("/api/courses/categories", courseCategoryRoutes);
app.use("/api/courses/lessons", courseLessonRoutes);
app.use("/api/courses/levels", courseLevelRoutes);
app.use("/api/courses/reviews", courseReviewRoutes);
app.use("/api/courses/sections", courseSectionRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users/roles", userRoleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Хүсэлт явуулсан хаяг олдсонгүй."));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  if (error instanceof MulterError) {
    statusCode = 400;
    if (error.code === "LIMIT_UNEXPECTED_FILE")
      errorMessage = "Буруу өргөтгөлтэй файл байна.";
    if (error.code === "LIMIT_FILE_SIZE")
      errorMessage =
        "Файлын хэмжээ хэтэрсэн байна. 1GB-аас доош хэмжээтэй файл оруулна уу.";
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
