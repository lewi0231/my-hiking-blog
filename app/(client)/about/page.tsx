import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";

const AboutPage = () => {
  return (
    <main className="h-[100vh]">
      <Hero
        mainImage={"/about_hero.jpeg"}
        title="My Journey Towards Trail Wisdom"
      />
      <p>A little about me</p>
    </main>
  );
};

export default AboutPage;
