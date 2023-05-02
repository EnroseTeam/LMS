import { ICourse } from "./courses";

interface UserAddress {
  country: string;
  city: string;
  district: string;
  apartment: string;
}

export interface IUserRole {
  _id: string;
  role: string;
  slug: string;
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
  role: IUserRole;
  boughtCourses: ICourse[];
  ownCourses: ICourse[];
  avgRating: number;
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
