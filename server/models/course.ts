import { Schema, model, Document, Types } from 'mongoose';
import { ICourseLesson } from './courseLesson';
import { IUser } from './user';
import { ICourseLevel } from './courseLevel';
import { ICourseCategory } from './courseCategory';
import { ICourseReview } from './courseReview';

interface Section {
  name: string;
  lessons: ICourseLesson['_id'][];
}

export interface ICourse extends Document<Types.ObjectId> {
  name: string;
  description?: string;
  picture: string;
  instructor: IUser['_id'];
  level: ICourseLevel['_id'];
  category: ICourseCategory['_id'];
  requirements: string[];
  goals: string[];
  reviews: ICourseReview['_id'][];
  sections: Section[];
  readCount: number;
  purchaseCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    picture: {
      type: String,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: 'Course_Level',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Course_Category',
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
      ref: 'Course_Review',
      default: [],
    },
    sections: {
      type: [
        {
          name: { type: String, required: true },
          lessons: {
            type: [Schema.Types.ObjectId],
            ref: 'Course_Lesson',
          },
        },
      ],
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
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<ICourse>('Course', CourseSchema);
