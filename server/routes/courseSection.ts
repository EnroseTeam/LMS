import express from 'express';
import {
  createCourseSection,
  deleteCourseSection,
  getCourseSetions,
  getSingleCourseSection,
  updateCourseSection,
} from '../controllers/courseSection';

const courseSectionRouter = express.Router();

courseSectionRouter.get('/', getCourseSetions);
courseSectionRouter.get('/:id', getSingleCourseSection);

courseSectionRouter.post('/', createCourseSection);

courseSectionRouter.patch('/:id', updateCourseSection);

courseSectionRouter.delete('/:id', deleteCourseSection);

export default courseSectionRouter;
