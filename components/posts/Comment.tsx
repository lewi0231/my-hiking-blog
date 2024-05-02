import { usePostContext } from "@/context/PostContext";
import { CommentComposite } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { LucideReply } from "lucide-react";
import { useState } from "react";
import CommentForm from "../CommentForm";
import TooltipWrapper from "../TooltipWrapper";
import { Button } from "../ui/button";
import CommentList from "./CommentList";
import IconButton from "./IconButton";

type Props = {
  comment: CommentComposite;
};

const Comment = ({ comment }: Props) => {
  const { user, _createdAt: created, children, message } = comment;
  const { getReplies } = usePostContext();
  const childComments = getReplies(comment._id);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="">
      <div className="shadow-sm shadow-gray-200 border border-input rounded-md py-1 px-4 bg-gray-40">
        <div className="flex justify-between font-semibold text-gray-700 items-center">
          <span className="text-sm">{user.name}</span>
          <span className="text-xs opacity-85 font-light">
            {format(parseISO(created), "PPpp")}
          </span>
        </div>
        <div className="pl-4 pt-1 pb-[2px] text-sm font-light tracking-wide">
          {message}
        </div>
        <div className="flex justify-start gap-4">
          {/* <IconButton Icon={HeartIcon} aria-label="like">
            2
          </IconButton> */}
          <TooltipWrapper label="Reply to this post!">
            <IconButton
              Icon={LucideReply}
              aria-label={isReplying ? "Cancel Reply" : "reply"}
              onClick={() => setIsReplying((prev) => !prev)}
              isActive={isReplying}
            />
          </TooltipWrapper>
          {/* <IconButton Icon={EditIcon} aria-label="edit" />
          <IconButton Icon={Trash} aria-label="delete" color="red" /> */}
        </div>
      </div>
      {isReplying && (
        <div>
          <CommentForm
            key={comment?._id}
            autoFocus
            parentId={comment?._id || null}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div
            className={cn("flex mt-2", areChildrenHidden ? "hidden" : "")}
            // hidden={areChildrenHidden ? true : false}
          >
            <button
              className="w-[15px] p-0 cursor-pointer relative before:absolute before:w-[1px] before:bg-purple-950 :before:bg-opacity-50 before:inset-0"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className=" pl-4 flex-grow space-y-2 mb-2">
              <CommentList comments={childComments} />
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
