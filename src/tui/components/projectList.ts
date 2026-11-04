import type { Project } from "#lib/api/projects.ts";
import { gray, primary } from "../utils";

export const projectList = (projects: Project[]) =>
  projects
    .map(
      (project) =>
        `${primary("-")} ${project.title} ${gray(`(${project.href})`)}\n  ${project.description}`,
    )
    .join("\n\n  ");
