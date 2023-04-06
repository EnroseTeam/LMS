import { Schema, model, Types, Document } from 'mongoose';

interface ICourseLesson extends Document<Types.ObjectId> {
  name: string;
  description?: string;
  video?: string;
  length: string;
  type: string;
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
  },
  { timestamps: true }
);

export default model<ICourseLesson>('Course_Lesson', CourseLessonSchema);
