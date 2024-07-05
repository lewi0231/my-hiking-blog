import { siteConfig } from "@/app/constants";
import Hero from "@/components/Hero";

const Contact = () => {
  return (
    <article>
      <Hero
        mainImage={siteConfig.featuredImages.contactImage.url}
        title="Contact"
        textPosition="bottom-left"
        imageAlt={siteConfig.featuredImages.contactImage.alt}
      />
    </article>
  );
};

export default Contact;
