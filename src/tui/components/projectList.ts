import { styleText } from "node:util";

import type { Project } from "#lib/api/projects.ts";
import { primary } from "../utils";

export const projectList = (projects: Project[]) =>
  projects
    .map(
      (project) =>
        `${primary("-")} ${project.title} ${styleText("gray", `(${project.href})`)}\n  ${project.description}`,
    )
    .join("\n\n  ");
