import * as ProjectsAPI from "#lib/api/projects.ts";
import { gray, title } from "../utils";
import { projectList } from "../components/projectList.ts";
import { footer } from "../components/footer.ts";

export default async (): Promise<string> => {
  const { items, nextCursor } = await ProjectsAPI.getAll();

  const seeMore = nextCursor ? `${gray(`\n\n [ See more projects in browser! ]`)}` : "";

  return `
${title("Projects")}
Some of my projects

  ${projectList(items)}${seeMore}

${footer()}
\n`;
};
