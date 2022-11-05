import { Post } from "@prisma/client";
import { UserData } from "../user/user.types";

export type PostData = Post & {
  author: UserData;
};
