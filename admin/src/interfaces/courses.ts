import { IInstructor, IUser } from "./user";

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
  instructor: IInstructor;
  level: ICourseLevel;
  category: ICourseCategory;
  requirements: string[];
  goals: string[];
  reviews: ICourseReview[];
  sections: ICourseSection[];
  readCount: number;
  purchaseCount: number;
  price: number;
  discountPrice: number;
  isPublished: boolean;
  avgRating: number;
  lessonCount: number;
  quizCount: number;
  assignmentCount: number;
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
  createdAt: string;
  updatedAt: string;
}

export interface ICourseReviewAnswer {
  _id: string;
  text: string;
  instructor: IInstructor;
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

export interface ICourseRequest {
  _id: string;
  course: ICourse;
  instructor: IInstructor;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: string;
}
