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

export type NewProject = Omit<Project, "id" | "lexorank" | "createdAt" | "updatedAt">;

export type UpdateProject = Partial<NewProject>;

export const getAll = async (cursor?: string | null) => {
  const query = new URLSearchParams();
  if (cursor) {
    query.append("cursor", cursor);
  }

  return await fetchFromAPI<ProjectListData>(`projects?${query.toString()}`);
};

export const loadMain = async () => {
  return await fetchFromAPI<Projects>("projects/main-page");
};

export const create = async (project: NewProject) => {
  return await fetchFromAPI<Project>("admin/projects", JSON.stringify(project));
};

export const edit = async (id: string, project: UpdateProject) => {
  return await fetchFromAPI<Project>(`admin/projects/${id}`, JSON.stringify(project), undefined, {
    method: "PATCH",
  });
};

export const getById = async (id: string) => {
  return await fetchFromAPI<Project>(`projects/${id}`);
};

export const deleteById = async (id: string) => {
  return await fetchFromAPI<Project>(`admin/projects/${id}`, undefined, undefined, {
    method: "DELETE",
  });
};

export const changePosition = async (
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
};
