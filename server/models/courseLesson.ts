import { Schema, model, Types, Document } from 'mongoose';
import { ICourseSection } from './courseSection';

export interface ICourseLesson extends Document<Types.ObjectId> {
  name: string;
  description?: string;
  video?: string;
  length: string;
  type: string;
  section: ICourseSection['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const CourseLessonSchema = new Schema<ICourseLesson>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    video: String,
    length: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Lesson', 'Quiz', 'Assignment'],
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: 'Course_Section',
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ICourseLesson>('Course_Lesson', CourseLessonSchema);
