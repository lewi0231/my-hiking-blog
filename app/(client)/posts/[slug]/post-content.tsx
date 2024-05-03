"use client";

import { Social } from "@/components/auth/social";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/posts/CommentList";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { usePostContext } from "@/context/PostContext";
import { Post } from "@/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { PostParams } from "./page";
import PostSummaryCard from "./post-summary-card";

type Props = {
  post: Post;
} & PostParams;

const PostContent = () => {
  const { post, rootComments, session } = usePostContext();

  return (
    <section className=" pt-6 bg-gray-50 px-10 rounded-md shadow-md flex-shrink-1 flex-grow-0 w-full sm:w-[1000px] min-w-0">
      <PostSummaryCard />
      <Separator className="mt-6" />
      <div className="w-full prose-p:tracking-normal prose-headings:font-bold prose-headings:pt-6 prose-headings:pb-2 prose-headings:uppercase prose-h2:text-3xl m-auto prose-p:py-2 py-6 text-gray-800 text-lg prose-p:text-justify pb-10 prose-li:list-disc prose-li:ml-4 prose-li:py-1 prose-h3:text-2xl prose-h4:text-xl prose-headings:font-karla prose-img:w-2/3 prose-img:m-auto">
        <PortableText
          value={post?.body}
          components={myPortableTextComponents}
        />
      </div>
      <Separator className="my-6" />
      <div className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl uppercase py-4 font-semibold">Comments</h1>
          {session ? (
            <TooltipWrapper
              label={`You're commenting as ${session.user?.name}`}
            >
              <Avatar className=" shadow-sm">
                <AvatarImage src={session.user?.image ?? undefined} />{" "}
                <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </TooltipWrapper>
          ) : (
            <OAuthModal />
          )}
        </div>
        <CommentForm />
        {rootComments != null && rootComments.length > 0 && (
          <div className="my-6 ">
            <CommentList comments={rootComments} />
          </div>
        )}
      </div>
    </section>
  );
};

// TODO - fix formatting
const OAuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log in to comment</Button>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <CardHeader>
            <CardTitle className=" text-2xl pb-2">Login to Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <Social />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

// TODO - need to extract this into it's own component so that it can be used elsewhere (e.g., for bio)
const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image src={urlForImage(value)} alt="Post" width={700} height={700} />
    ),
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
