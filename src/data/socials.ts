import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import {
  siteConfig,
  GITHUB_USERNAME,
  LINKEDIN_USERNAME,
} from "@/constants/site";
import type { SocialLink } from "@/types";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: siteConfig.links.github,
    handle: `@${GITHUB_USERNAME}`,
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    handle: `in/${LINKEDIN_USERNAME}`,
    icon: FaLinkedinIn,
  },
  {
    label: "X",
    href: siteConfig.links.twitter,
    handle: "@abdullahkhatri",
    icon: FaXTwitter,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.contact.email}`,
    handle: siteConfig.contact.email,
    icon: Mail,
  },
];
