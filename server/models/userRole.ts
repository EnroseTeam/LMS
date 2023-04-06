import { Schema, Document, Types, model } from "mongoose";

export interface IUserRole extends Document<Types.ObjectId> {
  role: string;
  slug: string;
}

const UserRoleSchema = new Schema<IUserRole>({
  role: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

export default model<IUserRole>("User_Role", UserRoleSchema);
