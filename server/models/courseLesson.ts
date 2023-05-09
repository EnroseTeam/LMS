import { Schema, model, Types, Document } from "mongoose";
import { ICourseSection } from "./courseSection";

export interface LessonLength {
  hour: number;
  minute: number;
  second: number;
}

export interface ICourseLesson extends Document<Types.ObjectId> {
  name: string;
  description?: string;
  video?: string;
  length: LessonLength;
  type: string;
  section: ICourseSection;
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
      hour: {
        type: Number,
        default: 0,
      },
      minute: {
        type: Number,
        default: 0,
      },
      second: {
        type: Number,
        default: 0,
      },
    },
    type: {
      type: String,
      enum: ["Lesson", "Quiz", "Assignment"],
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: "Course_Section",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ICourseLesson>("Course_Lesson", CourseLessonSchema);
