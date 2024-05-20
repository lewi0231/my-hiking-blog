import { type Comment as CommentType } from "@/lib/types";
import { User } from "@supabase/supabase-js";
import Comment from "./Comment";

type Props = {
  comments: CommentType[];
  user: User | null;
};

const CommentList = ({ comments, user }: Props) => {
  return comments.map((comment) => (
    <Comment
      key={comment?.id || comment?.created_at}
      comment={comment}
      user={user}
    />
  ));
};

export default CommentList;
