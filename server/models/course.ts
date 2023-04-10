import { Schema, model, Document } from 'mongoose';

interface Section {
  name: string;
  lessons: Schema.Types.ObjectId[];
}

interface ICourse extends Document<Schema.Types.ObjectId> {
  name: string;
  description?: string;
  instructor: Schema.Types.ObjectId;
  level: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  requirements: string[];
  goals: string[];
  reviews: Schema.Types.ObjectId[];
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
