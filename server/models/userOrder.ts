import { Schema, Types, Document, model } from "mongoose";
import { IUser } from "./user";
import { ICourse } from "./course";

export interface IUserOrder extends Document<Types.ObjectId> {
  orderNumber: string;
  user: IUser["_id"];
  courses: ICourse["_id"][];
  totalAmount: number;
  status: "Pending" | "Accepted";
  payerInformation: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      apartment: string;
      district: string;
      city: string;
      country: string;
    };
  };
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
    payerInformation: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        apartment: {
          type: String,
          required: true,
        },
        district: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

export default model<IUserOrder>("User_Order", UserOrderSchema);
