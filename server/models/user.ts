import { Schema, Document, Types, model } from "mongoose";
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
  role: "Admin" | "Moderator" | "Instructor" | "Student";
  orders: IUserOrder["_id"][];
  boughtCourses: ICourse["_id"][];
  socialAccounts: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  ownCourses: ICourse["_id"][];
  ownPublishedCourses: ICourse["_id"][];
  avgRating: number;
  reviewCount: number;
  studentCount: number;
  title: string;
  bio: string;
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
    orders: { type: [Schema.Types.ObjectId], ref: "User_Order", default: [] },
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
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Moderator", "Instructor", "Student"],
      default: "Student",
    },
    boughtCourses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
      default: [],
    },

    socialAccounts: {
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    bio: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    ownCourses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
      default: [],
    },
    ownPublishedCourses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
      default: [],
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    studentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
