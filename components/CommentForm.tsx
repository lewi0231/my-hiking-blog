"use client";

import { useForm } from "react-hook-form";

import { usePostContext } from "@/context/PostContext";
import { createComment } from "@/lib/actions";
import { CommentSchemaType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CommentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useEffect, useState, useTransition } from "react";
import { FormError } from "./form-error";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";

type Props = {
  autoFocus?: boolean;
  parentId?: string | null;
  user: User | null;
};

const CommentForm = ({ autoFocus = false, parentId = null, user }: Props) => {
  const { createLocalComment, postId } = usePostContext();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const newCommentId = crypto.randomUUID();

  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      commentId: newCommentId,
      message: "",
      postId,
      userId: user?.id,
      email: user?.email,
      parentId: parentId,
    },
  });

  const onSubmit = (values: CommentSchemaType) => {
    setError("");
    setSuccess("");

    createLocalComment(values);
    form.reset();

    startTransition(() => {
      createComment(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  useEffect(() => {
    if (user) {
      form.reset({
        ...form.getValues(),
        userId: user?.id,
        email: user?.email,
      });
    }
  }, [user, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-4 my-4 items-center"
      >
        <div className="w-full space-y-2">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Your comment..."
                    {...field}
                    autoFocus={autoFocus}
                    className=""
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormError message={error} />
        </div>
        <Button
          size="lg"
          type="submit"
          className={cn(
            "py-5 h-full",
            isPending || !user?.email ? "opacity-70" : ""
          )}
          disabled={isPending || !user?.email}
          onClick={() => {
            const validationState =
              form.getFieldState("message").error?.message;
            if (validationState) {
              setError(validationState);
            }
          }}
        >
          {isPending ? "Posting" : "Post"}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
