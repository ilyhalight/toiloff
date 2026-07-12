import { z } from "astro/zod";
import { fetchFromAPI } from "./internal";

export const Project = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  href: z.string(),
  imageUrl: z.string(),
  imageAlt: z.string(),
  canShowOnMain: z.boolean(),
  lexorank: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Project = z.infer<typeof Project>;

export const Projects = z.array(Project);
export type Projects = z.infer<typeof Projects>;

export const ProjetsRouteAPI = {
  load: async () => {
    return await fetchFromAPI<Projects>("projects/main-page");
  },
};
