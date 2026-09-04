/**
 * Single source of truth for identity strings.
 * Change these; nothing else needs touching.
 */
export const site = {
  name: "Maher Kurdi",
  handle: "MK",
  role: "Engineering Manager · Creative Technologist",
  tagline:
    "Engineering manager exploring the edge of design, motion and emerging tech.",
  url: "https://maherkurdi.com", // TODO: real domain
  location: "Belgium",
  email: "moesi88@icloud.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Maher-Reven" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/maherskrde/" },
    { label: "X", href: "https://x.com/maherkurdi" },
  ],
  nav: [
    { label: "Work", href: "/work", code: "01" },
    { label: "Lab", href: "/lab", code: "02" },
    { label: "About", href: "/about", code: "03" },
    { label: "Contact", href: "/contact", code: "04" },
  ],
} as const;
