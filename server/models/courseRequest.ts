import { Document, Types, Schema, model } from "mongoose";
import { ICourse } from "./course";
import { IUser } from "./user";

export interface ICourseRequest extends Document<Types.ObjectId> {
  course: ICourse["_id"];
  instructor: IUser["_id"];
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: Date;
  updatedAt: Date;
}

const CourseRequestSchema = new Schema<ICourseRequest>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default model<ICourseRequest>("Course_Request", CourseRequestSchema);
