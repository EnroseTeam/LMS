import express from 'express';
import { createCourse, getCourses, getSingleCourse } from '../controllers/course';

const courseRouter = express.Router();

courseRouter.get('/', getCourses);
courseRouter.get('/:id', getSingleCourse);

courseRouter.post('/', createCourse);

export default courseRouter;
