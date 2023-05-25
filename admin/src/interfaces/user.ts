import { ICourse } from "./courses";

interface UserAddress {
  country: string;
  city: string;
  district: string;
  apartment: string;
}

export interface IUserOrder {
  _id: string;
  orderNumber: string;
  user: string;
  courses: ICourse[];
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
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate?: string;
  email: string;
  phone: string;
  address: UserAddress;
  avatar: string;
  role: "Admin" | "Instructor" | "Moderator" | "Student";
  socialAccounts: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInstructor extends IUser {
  ownCourses: ICourse[];
  avgRating: number;
  reviewCount: number;
  studentCount: number;
}
