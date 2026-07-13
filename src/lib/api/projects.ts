import { z } from "astro/zod";
import { CursorNav, fetchFromAPI } from "./internal";

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

export const ProjectListData = CursorNav.extend({
  items: z.array(Project),
});
export type ProjectListData = z.infer<typeof ProjectListData>;

export const NewProject = Project.omit({
  id: true,
  lexorank: true,
  createdAt: true,
  updatedAt: true,
});

export type NewProject = z.infer<typeof NewProject>;

export const ProjetsRouteAPI = {
  getAll: async (cursor?: string | null) => {
    const query = new URLSearchParams();
    if (cursor) {
      query.append("cursor", cursor);
    }

    return await fetchFromAPI<ProjectListData>(`projects?${query.toString()}`);
  },
  loadMain: async () => {
    return await fetchFromAPI<Projects>("projects/main-page");
  },
  create: async (project: NewProject) => {
    return await fetchFromAPI<Project>(
      "admin/projects",
      JSON.stringify(project),
    );
  },
};
