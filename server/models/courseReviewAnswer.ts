import { Document, Schema, Types, model } from "mongoose";
import { IUser } from "./user";
import { ICourseReview } from "./courseReview";

export interface ICourseReviewAnswer extends Document<Types.ObjectId> {
  text: string;
  instructor: IUser["_id"];
  review: ICourseReview["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const CourseReviewAnswerSchema = new Schema<ICourseReviewAnswer>(
  {
    text: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: "Course_Review",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ICourseReviewAnswer>("Course_Review_Answer", CourseReviewAnswerSchema);
