import express from 'express';
import {
  createCourseLesson,
  deleteCourseLesson,
  getCourseLessons,
  getSingleCourseLesson,
  updateCourseLesson,
} from '../controllers/courseLesson';

const courseLessonRouter = express.Router();

courseLessonRouter.get('/', getCourseLessons);
courseLessonRouter.get('/:id', getSingleCourseLesson);

courseLessonRouter.post('/', createCourseLesson);

courseLessonRouter.patch('/:id', updateCourseLesson);

courseLessonRouter.delete('/:id', deleteCourseLesson);

export default courseLessonRouter;
