import Hero from "@/components/Hero";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

type InstagramPost = {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  timestamp: string;
  permalink: string;
};

async function fetchInstagramData() {
  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.INSTAGRAM_API_KEY}`;
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error("Failed to fetch Instagram feed");
    }
    const jsonData = await data.json();
    console.log(jsonData);

    return jsonData?.data || [];
  } catch (err: any) {
    console.error("Error fetching Instagram feed:", err.message);
  }
}

export async function getPhotos() {
  console.log("placeholder");
}

export const revalidate = 60;

const GalleryPage = async () => {
  const instagramFeed: InstagramPost[] = await fetchInstagramData();

  return (
    <main>
      <Hero
        mainImage={"/path.jpg"}
        subtitle="Photos."
        textPosition="bottom-left"
      />
      {instagramFeed && (
        <section className="w-full flex flex-col justify-center items-center px-14 bg-gradient-to-l to-gray-200 from-gray-50 h-full py-24">
          {/* <h2 className="text-2xl font-semibold">Instagram Feed:</h2> */}
          {/* <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> */}
          <div className="w-full columns-1 sm:columns-3 gap-4">
            {instagramFeed.map((post: InstagramPost) => (
              <div
                key={post.id}
                className="relative group w-full h-[300px] object-cover"
              >
                <Link
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
                >
                  {post.media_type === "VIDEO" ? (
                    <video
                      src={post.media_url}
                      controls={false}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={post.media_url}
                      alt={post.caption}
                      className="w-full h-full object-cover rounded-lg"
                      width={300}
                      height={300}
                      priority
                    />
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 w-full h-full">
                    <ArrowRightIcon
                      color="white"
                      className=""
                      width={32}
                      height={32}
                    />
                    <p className="text-white text-center text-xs truncate">
                      {post.caption}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default GalleryPage;
