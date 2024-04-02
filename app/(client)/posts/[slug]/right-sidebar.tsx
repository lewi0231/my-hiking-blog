import NewsletterForm from "@/components/NewsletterForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  wrapperClass: string;
  authorImage: string;
  authorName: string;
};

const RightSidebar = ({ wrapperClass, authorImage, authorName }: Props) => {
  return (
    <aside className={cn("relative w-full space-y-4", wrapperClass)}>
      <section className=" bg-gray-50 rounded-md shadow-md p-4">
        <h2 className="text-2xl mt-2 mb-4 font-bold ">About ...Trails</h2>
        <div className="flex gap-5 items-center">
          <Avatar>
            <AvatarImage src={authorImage} alt={authorName} />
            <AvatarFallback>PRL</AvatarFallback>
          </Avatar>
          <span>{authorName}</span>
        </div>
        <div className="mt-6">
          A bit about me and an image to insert that is different from the
          standard.
        </div>
      </section>
      <NewsletterForm />
    </aside>
  );
};

export default RightSidebar;
