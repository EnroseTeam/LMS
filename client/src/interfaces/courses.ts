import { IUser } from './user';

export interface ICourseCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  courseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICourse {
  _id: string;
  name: string;
  picture: string;
  description: string;
  instructor: IUser;
  level: ICourseLevel;
  category: string;
  requirements: string[];
  goals: string[];
  reviews: ICourseReview[];
  sections: string[];
  readCount: number;
  purchaseCount: number;
  price: number;
  discountPrice: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseLevel {
  _id: string;
  name: string;
  slug: string;
  description: string;
  courseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseReview {
  _id: string;
  title: string;
  text?: string;
  user: IUser;
  course: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
