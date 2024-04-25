"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";

const schema = z.object({
  postId: z.string(),
  comment: z.string(),
  user: z.string(),
  parentComment: z.string(),
});

type Props = {
  postId: string;
};

const CommentForm = ({ postId }: Props) => {
  const form = useForm<z.output<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: z.output<typeof schema>) {
    console.log(data);
  }

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
                <Textarea placeholder="Your comment..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button size="lg" type="submit" className="py-5">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
