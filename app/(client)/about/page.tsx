import { siteConfig } from "@/app/constants";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { HandIcon } from "lucide-react";

const AboutPage = () => {
  const { url: image, alt: imageAlt } = siteConfig.featuredImages.aboutImage;

  return (
    <article>
      <Hero
        mainImage={image}
        subtitle="About."
        textPosition="bottom-left"
        imageAlt={imageAlt}
      />

      <section className="bg-white h-full">
        <div className=" w-full max-w-[90vw] h-full m-auto px-4 md:px-20 py-24">
          <div className="m-auto w-full md:w-[600px] space-y-6">
            <h2 className=" text-4xl font-semibold">About.</h2>
            <div className="space-y-4 pt-2 text-gray-800 mr-12 leading-loose pb-4 font-medium w-full">
              <p>
                Recursive Trails attempts, perhaps ambitiously, to document or
                capture the wisdom of the trail.
              </p>
              <p>
                The idea is that much like going on a meditation retreat,
                immersing ourselves in nature puts us in touch with the sensory
                world and our moment to moment experience of it. This provides
                us with a unique opportunity to step outside the normal flow of
                our lives and reflect on who we are outside of the human bubble
                (e.g., the story that we may have told ourselves) in which we
                live.
              </p>
              <p>
                So, Recursive Trails is all about self-understanding through
                adventure.
              </p>
              <p>
                On a personal note, Recursive Trails has come about in response
                to my difficulties with mental health and my love of nature (and
                my passion for coding, of course!). Viewing hiking and nature as
                a bit of antitode to the stresses of the modern world.
              </p>
              <p>
                My time on earth has been a rather restless one, with my
                exploring a number of career paths, and it just so happens I am
                now a software developer. Thus, I give you this blog.
              </p>
              <p>
                If you have interests that you believe fit with the above and
                are interested in contributing or collaborating please get in
                touch.
              </p>
            </div>
            <div>
              <Button
                size="lg"
                className="flex gap-2 text-xl tracking-widest rounded-2xl w-fit"
                asChild
              >
                <a href="mailto:trailwisdom_blog@gmail.com?subject=Hi&body=Hi%20Paul,">
                  <span className="flex gap-4">
                    <HandIcon />
                    Say Hi!
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default AboutPage;
