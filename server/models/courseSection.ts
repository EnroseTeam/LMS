import { Schema, model, Types, Document } from 'mongoose';
import { ICourse } from './course';
import { ICourseLesson } from './courseLesson';

export interface ICourseSection extends Document<Types.ObjectId> {
  title: string;
  course: ICourse['_id'];
  lessons: ICourseLesson['_id'][];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSectionSchema = new Schema<ICourseSection>(
  {
    title: {
      type: String,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    lessons: {
      type: [Schema.Types.ObjectId],
      ref: 'Course_Lessons',
      default: [],
    },
  },
  { timestamps: true }
);

export default model<ICourseSection>('Course_Section', CourseSectionSchema);
