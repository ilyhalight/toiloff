import { type CursorNav, fetchFromAPI } from "./internal";

export type Project = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  canShowOnMain: boolean;
  lexorank: string;
  createdAt: string;
  updatedAt: string;
};

export type Projects = Project[];

export type ProjectListData = CursorNav & {
  items: Projects;
};

export type NewProject = Omit<
  Project,
  "id" | "lexorank" | "createdAt" | "updatedAt"
>;

export type UpdateProject = Partial<NewProject>;

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
  edit: async (id: string, project: UpdateProject) => {
    return await fetchFromAPI<Project>(
      `admin/projects/${id}`,
      JSON.stringify(project),
      undefined,
      { method: "PATCH" },
    );
  },
  getById: async (id: string) => {
    return await fetchFromAPI<Project>(`projects/${id}`);
  },
  delete: async (id: string) => {
    return await fetchFromAPI<Project>(
      `admin/projects/${id}`,
      undefined,
      undefined,
      { method: "DELETE" },
    );
  },
  changePosition: async (
    id: string,
    afterId: string | null = null,
    beforeId: string | null = null,
  ) => {
    return await fetchFromAPI<Project>(
      `admin/projects/${id}/position`,
      JSON.stringify({ afterId, beforeId }),
      undefined,
      { method: "PATCH" },
    );
  },
};
