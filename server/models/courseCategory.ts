import { Schema, model, Types, Document } from 'mongoose';

export interface ICourseCategory extends Document<Types.ObjectId> {
  name: string;
  image: string;
  slug: string;
  description?: string;
  courseCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseCategorySchema = new Schema<ICourseCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    courseCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<ICourseCategory>('Course_Category', CourseCategorySchema);
