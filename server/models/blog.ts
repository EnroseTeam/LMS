import { Schema, model, Types, Document } from 'mongoose';
import { IUser } from './user';

export interface IBlog extends Document<Types.ObjectId> {
  name: string;
  description: string;
  text: string;
  picture: string;
  user:IUser["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default model<IBlog>('Blog', blogSchema);
