import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import createHttpError, { isHttpError } from 'http-errors';

import courseLevelRoutes from './routes/courseLevel';
import courseCategoryRoutes from './routes/courseCategory';
import courseLessonRoutes from './routes/courseLesson';
import userRoleRoutes from './routes/userRole';

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes

app.use('/api/courses/categories', courseCategoryRoutes);
app.use('/api/courses/levels', courseLevelRoutes);
app.use('/api/courses/lessons', courseLessonRoutes);
app.use('/api/users/roles', userRoleRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
