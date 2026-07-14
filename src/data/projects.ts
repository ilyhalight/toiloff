export interface ProjectLink {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  tags: string[];
  year: string;
}

export const projects: ProjectLink[] = [
  {
    id: "voice-over-translation",
    title: "Voice Over Translation",
    description:
      "Browser extension and userscript that brings Yandex Browser-style voice-over video translation to other browsers.",
    href: "https://github.com/ilyhalight/voice-over-translation",
    image:
      "https://github.com/ilyhalight/voice-over-translation/raw/master/img/example.png",
    imageAlt: "Voice Over Translation interface example",
    tags: ["TypeScript", "Extension", "Userscript"],
    year: "2022",
  },
  {
    id: "stats-cards",
    title: "Stats Cards",
    description:
      "Fast Rust-powered stat cards for GitHub READMEs and profile pages, built around simple shareable URLs.",
    href: "https://github.com/ilyhalight/stats-cards",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Code editor with highlighted source code",
    tags: ["Rust", "Cards", "API"],
    year: "2025",
  },
  {
    id: "chaimu",
    title: "Chaimu",
    description:
      "Audio player focused on synchronizing audio with video for a cleaner watching and listening flow.",
    href: "https://github.com/ilyhalight/chaimu",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Audio mixing controls in a studio",
    tags: ["TypeScript", "Audio", "Web"],
    year: "2024",
  },
  {
    id: "ip-geolocation",
    title: "IP Geolocation",
    description:
      "Library for working with free and paid IP geolocation APIs through a small TypeScript interface.",
    href: "https://github.com/ilyhalight/ip-geolocation",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Map details with location lines",
    tags: ["TypeScript", "Library", "Geo"],
    year: "2024",
  },
  {
    id: "elysia-protobuf",
    title: "Elysia Protobuf",
    description:
      "Plugin that adds protobuf integration to Elysia apps without making every route handle serialization manually.",
    href: "https://github.com/ilyhalight/elysia-protobuf",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Server racks with glowing status lights",
    tags: ["Elysia", "Protobuf", "Bun"],
    year: "2025",
  },
  {
    id: "toiloff",
    title: "Toiloff Website",
    description:
      "Personal website and public web space for projects, notes, experiments, and small interface ideas.",
    href: "https://github.com/ilyhalight/toiloff",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Minimal desk setup with a laptop",
    tags: ["Astro", "Frontend", "Personal"],
    year: "2026",
  },
];
