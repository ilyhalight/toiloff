import * as ProjectsAPI from "../../../../lib/api/projects";

export const getPageProject = async (projectId?: string) => {
  if (!projectId) {
    return new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const project = await ProjectsAPI.getById(projectId).catch(() => undefined);
  if (!project) {
    return new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return project;
};
