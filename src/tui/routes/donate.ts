import { title, orange } from "../utils";
import { footer } from "../components/footer.ts";

export default async (): Promise<string> => {
  return `
${title("Donate")}

Sorry, but you need to ${orange("use browser")} to access this page :sob:

${footer()}
\n`;
};
