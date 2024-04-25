import { siteConfig } from "@/app/constants";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";

const AboutPage = () => {
  const image = siteConfig.pageImages.about;

  return (
    <article>
      <Hero
        mainImage={"/about_image.jpg"}
        subtitle="About."
        textPosition="bottom-left"
      />
      {/* <section className="min-h-screen bg-gray-100 flex"> */}
      {/* <Header title="Blog Posts" /> */}

      {/* <div className=" w-full max-w-[90vw] h-full m-auto mt-24 px-20">
          <div className="space-y-6  font-raleway">
            <h2 className=" text-4xl uppercase text-gray-800">
              What is Trail Wisdom!?
            </h2>
            <div className="flex w-full justify-between h-fit tracking-wide">
              <div className="space-y-4 pt-2  mr-12 leading-loose">
                <p className="">Currently Trail Wisdom is just me: Paul</p>
                <p>
                  (but I hope that this site will become more than just me).
                </p>
                <p>
                  Trail Wisdom emerged from my belief that escaping the comforts
                  of every day existance can lead to a more direct wisdom and
                  time to heal.
                </p>
                <p>
                  My goal for this site is to create a forum for discussing the
                  impact of spending time outside of the normal flow of things.
                  That is, outside of the expectations, external striving
                  towards the material and dulling our spirit through
                  destraction.
                </p>
                <p>
                  Like most, I think, I have had my difficulties with mental
                  health and from what I have read hiking (or nature) provides a
                  wonderful antidote for this. For some it seems like this is
                  escapism, but I am of the opinion that it clears things up.
                </p>
              </div>

              <Image
                width={500}
                height={500}
                src={image}
                alt={"Background Image of Man on Hill"}
                className="w-1/3 h-1/3 rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      </section> */}
      {/* <Separator color="#000000" className="bg-white h-full" /> */}
      <section className="bg-white h-full">
        <div className=" w-full max-w-[90vw] h-full m-auto px-20 py-24">
          <div className="m-auto w-2/3 space-y-6">
            <h2 className="uppercase text-3xl font-medium">
              About Trail Wisdom.
            </h2>
            <div className="space-y-4 pt-2 text-gray-800 mr-12 leading-loose">
              <p>
                Trail Wisdom attempts, perhaps ambitiously, to document or
                capture the wisdom of the trail.{" "}
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
                So, Trail Wisdom is all about self-understanding through
                adventure.
              </p>
              <p>
                On a personal note, Trail Wisdom has come about in response to
                my difficulties with mental health. After reaching my limit, in
                terms of stress and general and how often I have observed (in
                myself and others) the therapeutic value of being in nature. how
                the simple act of being in nature and choosing to go on
                adventures that take us out of our comfort zone for a while, can
                be hugely therapeutic.
              </p>
              <p>
                As a result of explored many career paths, and it just so
                happens I am now a software developer. Thus, I give you this
                blog.
              </p>

              <p>
                If you have interests that you believe fit with the above and
                are interested in contributing please get in touch.
              </p>
              <p>⊂(◉‿◉)つ </p>
            </div>
            <div>
              <Button
                size="lg"
                className="flex gap-2 uppercase text-xl tracking-widest rounded-xl w-fit"
                asChild
              >
                <a href="mailto:trailwisdom_blog@gmail.com">
                  <Mountain />
                  <span>Say Hi!</span>
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
