"use server";

import { client } from "@/sanity/lib/client";
import mailchimp from "@mailchimp/mailchimp_marketing";
import bcrypt from "bcrypt";
import md5 from "md5";
import { getUserByEmail } from "./data/user";
import {
  CommentSchemaType,
  LoginSchemaType,
  RegisterSchemaType,
  SubscribeSchemaType,
} from "./types";
import {
  CommentSchema,
  LoginSchema,
  RegisterSchema,
  SubscribeSchema,
} from "./validation";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function createComment(values: CommentSchemaType) {
  const validatedFields = CommentSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return { error: "Invalid comment" };
  }

  const user = await client.fetch('*[_type == "user" && email == $email]', {
    email: values.userEmail,
  });

  let userId;
  if (user.length > 0) {
    userId = user[0]._id;
  } else {
    const newUser = await client.create({
      _type: "user",
      email: values.userEmail,
      name: values.userName,
    });
    userId = newUser._id;
  }

  const comment = await client.create({
    _type: "comment",
    user: {
      _type: "reference",
      _ref: userId,
    },
    post: {
      _type: "reference",
      _ref: values.postId,
    },
    message: values.comment,
  });

  if (!comment) return { error: "Problem creating comment!" };

  await client
    .patch(values.postId)
    .setIfMissing({ comments: [] })
    .append("comments", [{ _type: "reference", _ref: comment._id }])
    .commit();

  return { success: "Comment created!" };
}

export async function login(values: LoginSchemaType) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
}

/**
 * Subscribes the user to receive email notifications however frequently.
 * Contacts are stored in mailchimp.
 */
export async function subscribe(values: SubscribeSchemaType) {
  const validatedFields = SubscribeSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, name } = validatedFields.data;
  const emailHash = md5(email);

  const response = await mailchimp.lists.setListMember(
    "9083190169",
    emailHash,
    {
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME: name,
      },
    }
  );

  if (response.status === "error") return { error: response.status };

  return { success: "You have been subscribed!" };
}

export async function register(values: RegisterSchemaType) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await getUserByEmail(email);

  if (user) {
    return { error: "Email already is use!" };
  }

  await client.create({
    _type: "user",
    name,
    email,
    password: hashedPassword,
  });

  // TODO: send verification token email

  return { success: "User created!" };
}
