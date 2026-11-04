import { defineCollection } from "astro:content";

import { file } from "astro/loaders";

import { z } from "astro/zod";

// 4. Define a `loader` and `schema` for each collection
// const blog = defineCollection({
//   loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     pubDate: z.coerce.date(),
//     updatedDate: z.coerce.date().optional(),
//   }),
// });

const settings = defineCollection({
  loader: file("src/data/settings.json"),
  schema: z.object({
    defaultTitle: z.string(),
    defaultDelimiter: z.string(),
  }),
});

const socials = defineCollection({
  loader: file("src/data/socials.json"),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    href: z.string(),
    icon: z.string(),
    order: z.number(),
  }),
});

const skills = defineCollection({
  loader: file("src/data/skills.json"),
  schema: z.object({
    slug: z.string(),
    icon: z.string(),
    order: z.number(),
  }),
});

export const collections = { settings, socials, skills };
