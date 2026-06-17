export type SocialPlatform = "Facebook" | "Instagram" | "LinkedIn";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
  ariaLabel: string;
};

export const socialLinks: SocialLink[] = [
  {
    platform: "Facebook",
    url: "https://www.facebook.com/Toknavgnss/",
    ariaLabel: "Follow TOKNAV on Facebook"
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/toknavgnss/",
    ariaLabel: "Follow TOKNAV on Instagram"
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/company/toknav-information-technology/",
    ariaLabel: "Follow TOKNAV on LinkedIn"
  }
];
