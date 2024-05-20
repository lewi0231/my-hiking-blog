"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * This server action is used to authenticate the user via supabase api.
 */
export const login = async (provider: "github" | "google") => {
  const supabase = createClient();
  const referer = headers().get("referer");

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${referer}`,
    },
  });

  if (error) {
    console.error(error);
  } else {
    console.log(data?.url);
    return redirect(data?.url);
  }
};

/**
 * This is designed to log the user out from supabase.
 * @returns Promise<void>
 */
export const logout = async () => {
  const supabase = createClient();
  const referer = headers().get("referer");

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  redirect(`${referer}`);
};
