import { types } from "util";
import { PostType } from "./post";
export interface UserType {
  mail: string;
  username: string;
  uploaded_posts?: PostType[];
  saved_posts?: PostType[];
  contact?: string;
  badges?: string[];
}
