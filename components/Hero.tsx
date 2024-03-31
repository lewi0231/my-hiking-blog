"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll);

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
          src="/hero.jpg"
          alt={"Background Image of Man on Hill"}
          className="w-full h-full fixed object-cover left-0 top-0 -z-10"
        />
        <div
          className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
 text-white z-10  text-center"
        >
          <h1 className=" text-5xl">Recursive Trails</h1>
          <h5 className="text-xl">
            Viewing life as journeys within journeys, trails within trails.
          </h5>
        </div>
      </div>
      <Navbar
        className={`fixed top-0 left-0 ${
          scrollPosition > 0
            ? "bg-black text-white transition-all duration-500 shadow-md"
            : "transition-all duration-500"
        }`}
      />
    </section>
  );
};

export default Hero;
