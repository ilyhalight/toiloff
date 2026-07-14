import type { BlogPostDetail } from "../components/Blog/types";

export const blogPosts: BlogPostDetail[] = [
  {
    id: "astro-page-transitions",
    title: "Making Astro Transitions Feel Native",
    tag: "Frontend",
    createdAt: "2026-06-18",
    readingTime: "6 min read",
    description:
      "Notes about route transitions, reveal animations, and keeping tiny details smooth without adding a heavy client runtime.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1800&q=85",
    href: "/blog/astro-page-transitions",
    authors: [
      {
        id: "toiloff",
        name: "Toil",
        role: "Fullstack dev",
        href: "/about",
        avatar: "https://rice.place/image/happagasa1.gif",
      },
    ],
    sections: [
      {
        id: "why-transitions-matter",
        title: "Why transitions matter",
        body: [
          "A route change is one of the most visible moments in a site. Even a small fade can make static pages feel connected instead of stitched together.",
          "The goal is not to add motion everywhere. The goal is to make movement explain where the visitor is going without delaying the page.",
        ],
      },
      {
        id: "keeping-runtime-small",
        title: "Keeping runtime small",
        body: [
          "Astro keeps most of the page static, so the transition layer should stay small too. A simple observer, route fade, and CSS tokens cover most of the interaction needs here.",
        ],
      },
      {
        id: "rough-edges",
        title: "Rough edges",
        body: [
          "The tricky part is not the animation itself, but preserving focus, scroll position, and readable states during navigation.",
        ],
      },
    ],
  },
  {
    id: "api-first-personal-site",
    title: "API-first Personal Website Content",
    tag: "Architecture",
    createdAt: "2026-05-27",
    readingTime: "4 min read",
    description:
      "How I want to keep posts, guestbook data, and site experiments outside the frontend while preserving a fast static shell.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=85",
    href: "/blog/api-first-personal-site",
    authors: [
      {
        id: "toiloff",
        name: "Toil",
        role: "API enjoyer",
        href: "/about",
        avatar: "https://rice.place/image/happagasa1.gif",
      },
    ],
    sections: [
      {
        id: "static-shell",
        title: "Static shell, external content",
        body: [
          "The frontend can stay fast and simple while the API owns content, guestbook messages, and future experiments.",
          "This keeps deploys focused: visual changes live in Astro, data changes live in the API.",
        ],
      },
      {
        id: "response-shape",
        title: "Response shape",
        body: [
          "The placeholder data mirrors the expected API shape so switching from local records to fetch calls should not force component rewrites.",
        ],
      },
      {
        id: "next-step",
        title: "Next step",
        body: [
          "The important next step is deciding which fields are stable enough to become the public post contract.",
        ],
      },
    ],
  },
  {
    id: "small-ui-systems",
    title: "Small UI Systems That Do Not Fight You",
    tag: "Design",
    createdAt: "2026-04-09",
    readingTime: "8 min read",
    description:
      "A practical look at tokens, rounded cards, glass headers, and the point where a design system becomes ceremony.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",
    href: "/blog/small-ui-systems",
    authors: [
      {
        id: "toiloff",
        name: "Toil",
        role: "Design system skeptic",
        href: "/about",
        avatar: "https://rice.place/image/happagasa1.gif",
      },
    ],
    sections: [
      {
        id: "tokens-first",
        title: "Tokens first",
        body: [
          "A useful UI system starts with the values that repeat: surfaces, text colors, rounded corners, and spacing. Components can stay local until reuse is real.",
        ],
      },
      {
        id: "avoid-ceremony",
        title: "Avoid ceremony",
        body: [
          "Too many abstractions make a small site harder to change. Scoped Astro styles keep component ownership obvious and reduce naming drift.",
        ],
      },
      {
        id: "when-to-split",
        title: "When to split",
        body: [
          "Split when a component has a clear responsibility or will be reused. Keep one-off layout details close to the page that owns them.",
        ],
      },
    ],
  },
];
