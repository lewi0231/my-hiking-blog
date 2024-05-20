"use client";

import { InstagramPost } from "@/lib/types";

const Video = ({ media }: { media: InstagramPost }) => {
  return (
    <video
      src={media.media_url}
      controls={true}
      className="w-full h-full object-cover"
      itemType="video/mp4"
    />
  );
};

export default Video;
