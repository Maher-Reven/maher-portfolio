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
  location: "Amsterdam, Netherlands",
  email: "moesi88@icloud.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Maher-Reven" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/maherskrde/" },
    { label: "X", href: "https://x.com/maherkurdi" },
  ],
  // `key` is the stable translation key; `label` is the English fallback used
  // wherever a raw string is needed (metadata, non-client contexts).
  nav: [
    { key: "work", label: "Work", href: "/work", code: "01" },
    { key: "experience", label: "Experience", href: "/experience", code: "02" },
    { key: "lab", label: "Lab", href: "/lab", code: "03" },
    { key: "about", label: "About", href: "/about", code: "04" },
    { key: "contact", label: "Contact", href: "/contact", code: "05" },
  ],
} as const;
