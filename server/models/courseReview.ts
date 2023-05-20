import { Schema, Document, Types, model } from "mongoose";
import { IUser } from "./user";
import { ICourse } from "./course";
import { ICourseReviewAnswer } from "./courseReviewAnswer";

export interface ICourseReview extends Document<Types.ObjectId> {
  title: string;
  text?: string;
  user: IUser["_id"];
  course: ICourse["_id"];
  rating: number;
  answer: ICourseReviewAnswer["_id"][];
  createdAt: Date;
  updatedAt: Date;
}

const CourseReviewSchema = new Schema<ICourseReview>(
  {
    title: { type: String, required: true },
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    rating: { type: Number, required: true },
    answer: {
      type: [Schema.Types.ObjectId],
      ref: "Course_Review_Answer",
      default: [],
    },
  },
  { timestamps: true }
);

export default model<ICourseReview>("Course_Review", CourseReviewSchema);
