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
// 5. Export a single `collections` object to register your collection(s)
export const collections = { settings };
