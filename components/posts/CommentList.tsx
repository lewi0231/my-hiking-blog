import { CommentComposite } from "@/lib/types";
import Comment from "./Comment";

type Props = {
  comments: CommentComposite[];
};

const CommentList = ({ comments }: Props) => {
  return comments.map((comment) => (
    <div key={comment?._id || comment?._createdAt} className="space-y-4">
      <Comment comment={comment} />
    </div>
  ));
};

export default CommentList;
