import { Schema, Document, Types, model } from "mongoose";

export interface ICourseLevel extends Document<Types.ObjectId> {
  name: string;
  slug: string;
  description?: string;
  courseCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseLevelSchema = new Schema<ICourseLevel>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    courseCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<ICourseLevel>("Course_Level", CourseLevelSchema);
