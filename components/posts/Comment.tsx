import { usePostContext } from "@/context/PostContext";
import { Comment as CommentType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Dot, MessageSquare } from "lucide-react";
import { useState } from "react";
import CommentForm from "../CommentForm";
import { Button } from "../ui/button";
import CommentList from "./CommentList";
import IconButton from "./IconButton";

type Props = {
  comment: CommentType;
  user: User | null;
};

const Comment = ({ comment, user }: Props) => {
  //   const { user, _createdAt: created, children, message } = comment;
  const { getReplies } = usePostContext();
  const childComments = getReplies(comment?.id);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const distanceToNow = comment?.created_at
    ? formatDistanceToNow(parseISO(comment?.created_at)) + " ago"
    : "";

  return (
    <div className="my-2">
      <div className="shadow-sm shadow-gray-200 border border-input rounded-md py-1 px-4 bg-gray-50">
        <div className="flex justify-start gap-4 items-center shadow-sm">
          <span className="text-sm font-extrabold">
            {comment?.email.split("@")[0]}
          </span>
          <Dot />
          <span className="text-xs opacity-85 font-light">{distanceToNow}</span>
        </div>
        <div className="pt-4 pb-2 text-sm font-light tracking-wide">
          {comment?.message}
        </div>
        <div className="flex justify-start gap-4">
          {/* <IconButton Icon={HeartIcon} aria-label="like">
            2
          </IconButton> */}

          <IconButton
            Icon={MessageSquare}
            aria-label={isReplying ? "Cancel Reply" : "reply"}
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            color="blue"
            // iconLabel="Reply"
          />

          {/* <IconButton Icon={EditIcon} aria-label="edit" />
          <IconButton Icon={Trash} aria-label="delete" color="red" /> */}
        </div>
      </div>
      {isReplying && (
        <div>
          <CommentForm
            key={comment?.id}
            autoFocus
            parentId={comment?.id || null}
            user={user}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div
            className={cn("flex", areChildrenHidden ? "hidden" : "")}
            // hidden={areChildrenHidden ? true : false}
          >
            <button
              className="w-[15px] p-0 cursor-pointer relative before:absolute before:w-[1px] before:bg-purple-950 :before:bg-opacity-50 before:inset-0"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className=" pl-4 flex-grow">
              <CommentList comments={childComments} user={user} />
            </div>
          </div>
          <Button
            className={cn(
              "my-2  duration-300 py-0",
              areChildrenHidden ? "" : "hidden"
            )}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </Button>
        </>
      )}
    </div>
  );
};

export default Comment;
