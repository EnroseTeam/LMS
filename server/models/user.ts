import { Schema, Document, Types, model } from "mongoose";
import { IUserRole } from "./userRole";
import { ICourse } from "./course";
import { IUserOrder } from "./userOrder";

interface UserAddress {
  country: string;
  city: string;
  district: string;
  apartment: string;
}

export interface IUser extends Document<Types.ObjectId> {
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate?: Date;
  email: string;
  phone?: string;
  address: UserAddress;
  avatar: string;
  password: string;
  role: IUserRole;
  orders: IUserOrder["_id"][];
  boughtCourses: ICourse["_id"][];
  ownCourses: ICourse["_id"][];
  avgRating: number;
  socialAccounts: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: {
      type: String,
      required: true,
    },
    birthDate: { type: Date },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    orders: { type: [Schema.Types.ObjectId], ref: "User_Order", default: [], select: false },
    address: {
      country: { type: String, default: "" },
      city: { type: String, default: "" },
      district: { type: String, default: "" },
      apartment: { type: String, default: "" },
    },
    avatar: {
      type: String,
      default:
        "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/T_Rpl0_PKsXMrHoPphE91-default-profile.jpg",
    },
    password: { type: String, required: true, select: false },
    role: {
      type: Schema.Types.ObjectId,
      ref: "User_Role",
      required: true,
    },
    boughtCourses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
      default: [],
      select: false,
    },
    ownCourses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
      default: [],
      select: false,
    },
    avgRating: {
      type: Number,
      default: 0,
      select: false,
    },
    socialAccounts: {
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    bio: String,
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
