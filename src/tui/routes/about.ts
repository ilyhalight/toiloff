import { calcTableGaps, gray, orange, title } from "../utils";
import { footer } from "../components/footer.ts";
import { getCollection } from "astro:content";

export default async (): Promise<string> => {
  const socials = (await getCollection("socials"))
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => entry.data);
  const skills = (await getCollection("skills"))
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => entry.data);

  const socialsTable = socials.map((social) => [
    orange(social.label.toLowerCase()),
    gray(social.href === "#" ? "only in browser" : social.href),
  ]);
  const socialsGaps = calcTableGaps(socialsTable);

  return `
${title("About")}
Small info about me

${title("Find me online")}

${socialsTable
  .map((row) => {
    return `  ${row.map((cell, idx) => cell.padEnd(socialsGaps[idx])).join("    ")}`;
  })
  .join("\n")}

${title("Tech stack")}

${skills.map((skill) => orange(`  ${skill.slug}`)).join(",")}

${footer()}
\n`;
};
