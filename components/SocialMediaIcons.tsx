import { siteConfig } from "@/app/constants";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

type Props = {
  isDarkBackground?: boolean;
  scrollPosition?: number;
};

const SocialMediaIcons = ({
  isDarkBackground = false,
  scrollPosition = 0,
}: Props) => {
  return (
    <ul className="flex gap-4 h-full">
      <li className="h-full align-middle">
        <a href={siteConfig.socialMedia.instagram} target="__blank">
          <InstagramLogoIcon
            className="icon-nav"
            color={isDarkBackground && scrollPosition === 0 ? "white" : "black"}
          />
        </a>
      </li>
      <li>
        <a href={siteConfig.socialMedia.twitter} target="__blank">
          <TwitterLogoIcon
            className="icon-nav"
            color={isDarkBackground && scrollPosition === 0 ? "white" : "black"}
          />
        </a>
      </li>
      <li>
        <a href={siteConfig.socialMedia.github} target="__blank">
          <GitHubLogoIcon
            className="icon-nav"
            color={isDarkBackground && scrollPosition === 0 ? "white" : "black"}
          />
        </a>
      </li>
    </ul>
  );
};

export default SocialMediaIcons;
