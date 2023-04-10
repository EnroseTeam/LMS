import { Schema, Document, Types, model } from 'mongoose';

interface ICourseReview extends Document<Types.ObjectId> {
  text?: string;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  rating: number;
}

const CourseReviewSchema = new Schema<ICourseReview>(
  {
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<ICourseReview>('Course_Review', CourseReviewSchema);
