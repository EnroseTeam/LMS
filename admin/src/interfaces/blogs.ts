import { IUser } from "./user";

export interface IBlog {
  _id: string;
  name: string;
  description: string;
  text: string;
  picture: string;
  user: IUser;
  updatedAt: string;
}
