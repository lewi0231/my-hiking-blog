"use client";

import AuthModal from "@/components/auth/auth-modal";
import UserDisplay from "@/components/auth/user-display";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/posts/CommentList";
import { Separator } from "@/components/ui/separator";
import { usePostContext } from "@/context/PostContext";
import { urlForImage } from "@/sanity/lib/image";
import { createClient } from "@/utils/supabase/client";
import { PortableText } from "@portabletext/react";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import PostSummaryCard from "./post-summary-card";

const PostContent = () => {
  const { post, rootComments } = usePostContext();
  const [user, setUser] = useState<User | null>(null);

  const handleSignOut = () => {
    setUser(null);
  };

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Failed to retrieve user:", error);
        return;
      }

      setUser(data?.user ?? null);
    };

    fetchUser();
  }, []);

  return (
    <section className=" pt-6 bg-gray-50 px-10 rounded-md shadow-md flex-shrink-1 flex-grow-0 w-full sm:w-[1000px] min-w-0">
      <PostSummaryCard />
      <Separator className="mt-6" />
      <div className="w-full prose-p:tracking-normal prose-headings:font-bold prose-headings:pt-6 prose-headings:pb-2 prose-headings:uppercase prose-h2:text-3xl m-auto prose-p:py-2 py-6 text-gray-800 text-lg prose-p:text-justify pb-10 prose-li:list-disc prose-li:ml-4 prose-li:py-1 prose-h3:text-2xl prose-h4:text-xl prose-headings:font-karla prose-img:w-3/4 prose-img:m-auto prose-img:my-2">
        <PortableText
          value={post?.body}
          components={myPortableTextComponents}
        />
      </div>
      <Separator className="my-6" />
      <div className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl uppercase py-4 font-semibold">Comments</h1>
          {user ? (
            <UserDisplay user={user} handleSignOut={handleSignOut} />
          ) : (
            <AuthModal />
          )}
        </div>
        <CommentForm user={user} />
        {rootComments != null && rootComments.length > 0 && (
          <div className="my-6">
            <CommentList comments={rootComments} user={user} />
          </div>
        )}
      </div>
    </section>
  );
};

// TODO - need to extract this into it's own component so that it can be used elsewhere (e.g., for bio)
const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      // TODO - work out why urlForImage is no longer working as it should
      return (
        <Image
          src={urlForImage(value)}
          alt="Post"
          width={700}
          height={700}
          priority
        />
      );
    },
    a: ({ children, href }: any) => (
      <a href={href} target="_blank" rel="noopener noreferer">
        {children}
      </a>
    ),
  },
  block: {
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 my-2 italic tracking-wider bg-purple-100">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
};

export default PostContent;
