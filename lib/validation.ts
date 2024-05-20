import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(6, { message: "Minimum 6 characters required!" }),
  name: z.string().min(1, {
    message: "Name is required!",
  }),
});

export const SubscribeSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  name: z.string().min(1, { message: "Name is required!" }),
});

export const CommentSchema = z.object({
  postId: z.string().min(1, { message: "Please try again later!" }),
  message: z.string().min(1, { message: "Comment is required!" }),
  email: z.string().email(),
  parentId: z.string().or(z.null()),
  commentId: z.string().min(1),
  userId: z.string().min(1),
});
