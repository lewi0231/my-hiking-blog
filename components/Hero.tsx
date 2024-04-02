"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";
import { Tag } from "@/app/utils/Interface";
import Link from "next/link";
import { Badge } from "./ui/badge";

type Props = {
  mainImage: string;
  textPosition?: "bottom-left" | "center" | "bottom-center";
  title?: string;
  subtitle?: string;
  textClass?: string;
  tags?: Tag[];
};

const Hero = ({
  mainImage,
  title,
  subtitle,
  textPosition = "center",
  textClass,
  tags,
}: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  console.log(tags);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative h-[100vh]">
      <div className="relative w-full h-full">
        <Image
          width={1000}
          height={1000}
          src={mainImage}
          alt={"Background Image of Man on Hill"}
          className="w-full h-full fixed object-cover left-0 top-0 -z-10"
          priority
        />
        <div
          className={cn(
            // " absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 text-center"
            "absolute bottom-1/4 left-1/2 -translate-x-1/2 text-white text-center",
            textClass
          )}
        >
          <h1 className=" text-4xl semibold tracking-tight">{title}</h1>
          <h5 className="text-xl font-semibold tracking-wider mt-2">
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
      <Navbar
        className={`fixed top-0 left-0 ${
          scrollPosition > 0
            ? "bg-black text-white transition-all duration-500 shadow-md"
            : "transition-all duration-500"
        }`}
        position={scrollPosition}
      />
    </section>
  );
};

export default Hero;
