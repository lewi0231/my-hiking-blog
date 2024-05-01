import * as z from "zod";
import {
  CommentSchema,
  LoginSchema,
  RegisterSchema,
  SubscribeSchema,
} from "./validation";

export type LoginSchemaType = z.output<typeof LoginSchema>;

export type RegisterSchemaType = z.output<typeof RegisterSchema>;

export type SubscribeSchemaType = z.output<typeof SubscribeSchema>;

export type CommentSchemaType = z.output<typeof CommentSchema>;
