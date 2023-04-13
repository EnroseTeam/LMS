import { Schema, Document, Types, model } from 'mongoose';
import { IUser } from './user';
import { ICourse } from './course';

export interface ICourseReview extends Document<Types.ObjectId> {
  title: string;
  text?: string;
  user: IUser['_id'];
  course: ICourse['_id'];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseReviewSchema = new Schema<ICourseReview>(
  {
    title: { type: String, required: true },
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<ICourseReview>('Course_Review', CourseReviewSchema);
