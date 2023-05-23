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
import searchRoutes from "./routes/search";
import blogRoutes from "./routes/blog";
import userOrderRoutes from "./routes/userOrder";
import instructorRoutes from "./routes/instructors";
import courseReviewAnswerRoutes from "./routes/courseReviewAnswer";
import courseRequestRoutes from "./routes/courseRequest";
import sessionConfig from "./configs/session";

const app: Express = express();

if (env.NODE_ENV === "production") {
  app.set("trust proxy", true);
}

const allowedDomains = [
  env.NODE_ENV === "production" ? "http://intellisense.e-cpta.mn/" : "http://localhost:3000",
  env.NODE_ENV === "production" ? "http://admin-intellisense.e-cpta.mn" : "http://localhost:3001",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(session(sessionConfig));

// Routes
app.use("/api/files", fileRoutes);
app.use("/api/courses/requests", courseRequestRoutes);
app.use("/api/courses/categories", courseCategoryRoutes);
app.use("/api/courses/lessons", courseLessonRoutes);
app.use("/api/courses/levels", courseLevelRoutes);
app.use("/api/courses/reviews/answers", courseReviewAnswerRoutes);
app.use("/api/courses/reviews", courseReviewRoutes);
app.use("/api/courses/sections", courseSectionRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users/roles", userRoleRoutes);
app.use("/api/users/orders", userOrderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/instructors", instructorRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Хүсэлт явуулсан хаяг олдсонгүй."));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.";
  let statusCode = 500;

  console.log(error);

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
