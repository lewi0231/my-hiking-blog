"use client";

import { Tag } from "@/app/utils/Interface";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

type Props = {
  mainImage: string;
  textPosition?: "bottom-left" | "center" | "bottom-center";
  title?: string;
  subtitle?: string;
  textClass?: string;
  tags?: Tag[];
  imageAlt: string;
};

const Hero = ({
  mainImage,
  title,
  subtitle,
  textPosition = "center",
  textClass,
  tags,
  imageAlt,
}: Props) => {
  return (
    <section className="relative h-[100vh]">
      <div className="relative w-full h-full">
        <Image
          width={1000}
          height={1000}
          fetchPriority="high"
          src={mainImage}
          alt={imageAlt}
          className="w-full h-full fixed object-cover left-0 top-0 -z-10"
          decoding="async"
          priority
        />
        <div
          className={cn(
            "absolute text-white text-center",
            textPosition === "center"
              ? "bottom-1/4 left-1/2 -translate-x-1/2 "
              : " bottom-[100px] left-[120px] ",
            textClass
          )}
        >
          <h1 className={cn(" text-4xl", " font-east-sea-dokdo")}>{title}</h1>
          <h5
            className={cn(
              "text-4xl font-medium tracking-normal font-raleway uppercase"
            )}
          >
            {subtitle}
          </h5>
          <div className="flex justify-center gap-4 mt-4">
            {tags?.map((tag: Tag) => (
              <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
                <Badge
                  className="opacity-75 hover:opacity-95"
                  variant="default"
                >
                  #{tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
