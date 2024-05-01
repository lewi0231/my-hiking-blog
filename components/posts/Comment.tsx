import { type Comment } from "@/app/utils/Interface";
import { usePostContext } from "@/context/PostContext";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { EditIcon, HeartIcon, LucideReply, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import CommentList from "./CommentList";
import IconButton from "./IconButton";

type Props = {
  comment: Comment;
};

const Comment = ({ comment }: Props) => {
  const { user, created, children, message } = comment;
  const { getReplies } = usePostContext();
  const childComments = getReplies(comment._id);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);

  return (
    <div className="">
      <div className="border-2 rounded-md border-gray-200 py-2 px-4">
        <div className="flex justify-between font-semibold opacity-70 text-blue-950 text-muted-foreground items-center">
          <span className="text-lg">{user.name}</span>
          <span className="text-sm opacity-70">
            {format(parseISO(created), "PPpp")}
          </span>
        </div>
        <div className="pl-4 py-2 text-sm font-light tracking-wide">
          {message}
        </div>
        <div className="flex justify-start gap-4">
          <IconButton Icon={HeartIcon} aria-label="like">
            2
          </IconButton>
          <IconButton Icon={LucideReply} aria-label="reply" />
          <IconButton Icon={EditIcon} aria-label="edit" />
          <IconButton Icon={Trash} aria-label="delete" color="red" />
        </div>
      </div>
      {childComments?.length > 0 && (
        <>
          <div
            className={cn("flex mt-2", areChildrenHidden ? "hidden" : "")}
            // hidden={areChildrenHidden ? true : false}
          >
            <button
              className="w-[15px] p-0 cursor-pointer relative before:absolute before:w-[2px] before:bg-black before:inset-0"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className=" pl-4 flex-grow">
              <CommentList comments={childComments} />
            </div>
          </div>
          <Button
            className={cn(
              "mt-1 bg-blue-500/90 hover:bg-blue-500 duration-300",
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
