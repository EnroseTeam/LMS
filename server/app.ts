import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";

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
import { MulterError } from "multer";

const app: Express = express();

app.use(cors());
app.use(express.json());

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
    if (error.code === "LIMIT_UNEXPECTED_FILE") errorMessage = "Буруу өргөтгөлтэй файл байна.";
    if (error.code === "LIMIT_FILE_SIZE")
      errorMessage = "Файлын хэмжээ хэтэрсэн байна. 1GB-аас доош хэмжээтэй файл оруулна уу.";
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
