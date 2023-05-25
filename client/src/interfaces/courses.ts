import { IUser } from "./user";

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
  video: string;
  description: string;
  instructor: IUser;
  level: ICourseLevel;
  category: ICourseCategory;
  requirements: string[];
  goals: string[];
  reviews: ICourseReview[];
  sections: ICourseSection[];
  readCount: number;
  students: IUser[];
  price: number;
  discountPrice: number;
  isPublished: boolean;
  avgRating: number;
  lessonCount: number;
  totalLessonLength: LessonLength;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseLevel {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  courseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseReview {
  _id: string;
  title: string;
  text?: string;
  user: IUser;
  course: ICourse;
  rating: number;
  answer: ICourseReviewAnswer[];
  testimonial: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseReviewAnswer {
  _id: string;
  text: string;
  instructor: IUser;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseSection {
  _id: string;
  title: string;
  course: string;
  lessons: ICourseLesson[];
  createdAt: string;
  updatedAt: string;
}

export interface ICourseLesson {
  _id: string;
  name: string;
  description: string;
  video?: string;
  length: {
    hour: number;
    minute: number;
    second: number;
  };
  type: string;
  section: ICourseSection;
  createdAt: string;
  updatedAt: string;
}

export interface LessonLength {
  hour: number;
  minute: number;
  second: number;
}
