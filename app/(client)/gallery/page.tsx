import Hero from "@/components/Hero";
import TooltipWrapper from "@/components/TooltipWrapper";
import Video from "@/components/Video";
import { type InstagramPost } from "@/lib/types";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ArrowRight } from "lucide-react";

import Image from "next/image";

export const revalidate = 60;

async function getInstagramFeed() {
  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.INSTAGRAM_API_KEY}`;
    const data = await fetch(url);

    console.debug("Instagram Feed: ", data);
    if (!data.ok) {
      return { error: "There was a problem fetching Instagram Feed" };
    }

    const feed = await data.json();
    return { feed };
  } catch (err: any) {
    console.error("Error fetching Instagram feed:", err.message);
    return { error: "There was a problem fetching Instagram Feed" };
  }
}

const GalleryPage = async () => {
  const { feed, error } = await getInstagramFeed();

  return (
    <article>
      <Hero
        mainImage={"/path.jpg"}
        subtitle="Gallery."
        textPosition="bottom-left"
        imageAlt="Ocean trail"
      />
      {feed && (
        <section className="w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-14 bg-gradient-to-l to-gray-200 from-gray-50 h-full py-12">
          <div className="w-full columns-1 sm:columns-3 md:columns-4 gap-2 space-y-2">
            {feed.data.map((media: InstagramPost) => (
              <TooltipWrapper
                label={media?.caption}
                key={media?.id}
                className="break-inside-avoid"
              >
                <a href={media?.permalink} target="_blank">
                  {media.media_type === "VIDEO" ? (
                    <Video media={media} />
                  ) : (
                    <div className="relative group">
                      <Image
                        src={media.media_url}
                        alt={media.caption}
                        className="w-full h-full object-cover group-hover:opacity-70 duration-300"
                        width={300}
                        height={300}
                        priority
                      />
                      <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 opacity-0 group-hover:opacity-100 duration-300">
                        <ArrowRight size={40} />
                      </span>
                    </div>
                  )}
                  <p className="text-[10px] text-opacity-50 py-0 tracking-widest">
                    Posted {formatDistanceToNow(parseISO(media.timestamp))} ago.
                  </p>
                </a>
              </TooltipWrapper>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default GalleryPage;
