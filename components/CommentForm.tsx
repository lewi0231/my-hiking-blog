"use client";

import { useForm } from "react-hook-form";

import { Post } from "@/app/utils/Interface";
import { createComment } from "@/lib/actions";
import { CommentSchemaType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CommentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useState, useTransition } from "react";
import { FormError } from "./form-error";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";

type Props = { post: Post; session: Session | null };

const CommentForm = ({ post, session }: Props) => {
  // const { post, session } = usePostContext() ?? {};

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
      postId: post._id,
      userName: session?.user?.name ?? "",
      userEmail: session?.user?.email ?? "",
    },
  });

  const onSubmit = (values: CommentSchemaType) => {
    console.log(values);
    setError("");
    setSuccess("");

    startTransition(() => {
      createComment(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });

    if (success) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-4 mb-10 items-center"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea placeholder="Your comment..." {...field} autoFocus />
              </FormControl>
            </FormItem>
          )}
        />
        <FormError message={error} />
        <Button
          size="lg"
          type="submit"
          className={cn("py-5 h-full", isPending ? "opacity-70" : "")}
          disabled={isPending}
        >
          {isPending ? "Loading" : "Post"}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
