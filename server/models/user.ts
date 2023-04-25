import { Schema, Document, Types, model } from "mongoose";
import { IUserRole } from "./userRole";
import { ICourse } from "./course";

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
  phone: string;
  address?: UserAddress;
  avatar?: string;
  password: string;
  role: IUserRole;
  boughtCourses: ICourse["_id"][];
  ownCourses: ICourse["_id"][];
  avgRating: number;
  socialAccounts: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
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
      default: function () {
        return this.lastName + " " + this.firstName;
      },
    },
    birthDate: { type: Date },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: {
      country: String,
      city: String,
      district: String,
      apartment: String,
      default: {},
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
    },
    ownCourses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    socialAccounts: {
      facebook: String,
      linkedin: String,
      twitter: String,
      instagram: String,
      default: {},
    },
    bio: String,
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
