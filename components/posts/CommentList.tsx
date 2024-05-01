import { type Comment as CommentType } from "@/app/utils/Interface";

import Comment from "./Comment";

type Props = {
  comments: CommentType[];
};

const CommentList = ({ comments }: Props) => {
  return comments.map((comment) => (
    <div key={comment._id} className="h-full ">
      <Comment comment={comment} />
    </div>
  ));
};

export default CommentList;
