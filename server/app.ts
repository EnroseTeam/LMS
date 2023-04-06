import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";

import courseLevelRoutes from "./routes/courseLevel";

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/courses/levels", courseLevelRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
