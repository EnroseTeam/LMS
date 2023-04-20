import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user";
import { ICourseLevel } from "./courseLevel";
import { ICourseCategory } from "./courseCategory";
import { ICourseReview } from "./courseReview";
import { ICourseSection } from "./courseSection";
import { LessonLength } from "./courseLesson";

export interface ICourse extends Document<Types.ObjectId> {
  name: string;
  description: string;
  picture: string;
  instructor: IUser["_id"];
  level: ICourseLevel["_id"];
  category: ICourseCategory["_id"];
  requirements: string[];
  goals: string[];
  reviews: ICourseReview["_id"][];
  sections: ICourseSection["_id"][];
  readCount: number;
  purchaseCount: number;
  price: number;
  discountPrice: number;
  isPublished: boolean;
  avgRating: number;
  lessonCount: number;
  quizCount: number;
  assignmentCount: number;
  totalLessonLength: LessonLength;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: "Course_Level",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Course_Category",
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    goals: {
      type: [String],
      required: true,
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Course_Review",
      default: [],
    },
    sections: {
      type: [Schema.Types.ObjectId],
      ref: "Course_Section",
      default: [],
    },
    readCount: {
      type: Number,
      default: 0,
    },
    purchaseCount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    lessonCount: {
      type: Number,
      default: 0,
    },
    quizCount: {
      type: Number,
      default: 0,
    },
    assignmentCount: {
      type: Number,
      default: 0,
    },
    totalLessonLength: {
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
  },
  { timestamps: true }
);

export default model<ICourse>("Course", CourseSchema);
