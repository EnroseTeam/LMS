import { Schema, model, Types, Document } from 'mongoose';
import { ICourseLesson } from './courseLesson';
import { ICourse } from './course';

interface ICourseSection extends Document<Types.ObjectId> {
  title: string;
  lessons: ICourseLesson['_id'][];
  course: ICourse['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSectionSchema = new Schema<ICourseSection>(
  {
    title: {
      type: String,
      required: true,
    },
    lessons: {
      type: [Schema.Types.ObjectId],
      ref: 'Course_Lesson',
      default: [],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ICourseSection>('Course_Section', CourseSectionSchema);
