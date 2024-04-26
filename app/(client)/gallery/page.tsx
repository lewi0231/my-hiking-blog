import { Photo } from "@/app/utils/Interface";
import { photoFeedQuery } from "@/app/utils/queries";
import Hero from "@/components/Hero";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

type InstagramPost = {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  timestamp: string;
  permalink: string;
};

async function getPhotos() {
  const query = photoFeedQuery();
  const data: Photo[] = await client.fetch(query);
  return data;
}

export const revalidate = 60;

const GalleryPage = async () => {
  const photoFeed: Photo[] = await getPhotos();

  return (
    <main>
      <Hero
        mainImage={"/path.jpg"}
        subtitle="Photos."
        textPosition="bottom-left"
      />
      {photoFeed && (
        <section className="w-full flex flex-col justify-center items-center px-14 bg-gradient-to-l to-gray-200 from-gray-50 h-full py-12">
          <div className="w-full columns-1 sm:columns-4 gap-2 space-y-2">
            {photoFeed.map((photo: Photo) => (
              <Image
                key={photo._id}
                src={photo.image.asset.url}
                alt={photo.image.asset.alt}
                className="w-full h-full object-cover"
                width={300}
                height={300}
                priority
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default GalleryPage;
