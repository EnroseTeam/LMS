import { Schema, Document, Types, model } from 'mongoose';

export interface IUser extends Document<Types.ObjectId> {
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  phone: string;
  address?: string;
  avatar?: string;
  password: string;
  role: Schema.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true, select: false },
  email: { type: String, required: true, unique: true, select: false },
  phone: { type: String, required: true, unique: true, select: false },
  address: { type: String, select: false },
  avatar: { type: String },
  password: { type: String, required: true, select: false },
  role: {
    type: Schema.Types.ObjectId,
    ref: "User_Role",
    required: true,
    select: false,
  },
});

export default model<IUser>('User', UserSchema);
