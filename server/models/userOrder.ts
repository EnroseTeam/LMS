import { Schema, Types, Document, model } from "mongoose";
import { IUser } from "./user";
import { ICourse } from "./course";

export interface IUserOrder extends Document<Types.ObjectId> {
  orderNumber: string;
  user: IUser["_id"];
  courses: ICourse["_id"][];
  totalAmount: number;
  status: "Pending" | "Accepted";
  createdAt: Date;
  updatedAt: Date;
}

const UserOrderSchema = new Schema<IUserOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courses: { type: [Schema.Types.ObjectId], ref: "Course" },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Accepted"], default: "Pending" },
  },
  { timestamps: true }
);

export default model<IUserOrder>("User_Order", UserOrderSchema);
