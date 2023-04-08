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
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String },
  avatar: { type: String },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'User_Role' },
});

export default model<IUser>('User', UserSchema);
