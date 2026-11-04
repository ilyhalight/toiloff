import { styleText } from "node:util";

import { getMainPage } from "#lib/api/bff.ts";
import * as GuestbookAPI from "#lib/api/guestbook.ts";
import { dateFormatter } from "#lib/utils.ts";
import { orange, primary, title } from "../utils";
import { projectList } from "../components/projectList.ts";
import { footer } from "../components/footer.ts";

const getGuestbookContent = (guestbook: GuestbookAPI.GuestbookData | null) => {
  if (!guestbook) {
    return `The guestbook isn't available right now. Please try again in a few minutes`;
  }

  if (!guestbook.items.length) {
    return `No messages yet. Maybe you'll be the 1st? Please... (ಥ﹏ಥ)`;
  }

  return (
    guestbook.items
      .map((message) => {
        let subContent = "";
        if (message.href && message.subText) {
          subContent = `${message.subText} (${styleText("gray", message.href)})`;
        } else if (message.href) {
          subContent = styleText("gray", message.href);
        } else if (message.subText) {
          subContent = message.subText;
        }
        if (subContent) {
          subContent = `\n  ${subContent}`;
        }

        const date = styleText("gray", dateFormatter.format(new Date(message.createdAt)));
        const replied = message.replyText
          ? styleText("gray", `\n  replied: ${message.replyText}`)
          : "";

        return `${styleText("bold", orange(message.username))}${subContent}\n  ${styleText("gray", "›")} ${message.content}${replied}\n  ${date}`;
      })
      .join("\n\n  ") +
    (guestbook.nextCursor ? `\n\n  ${styleText("gray", `[ See more messages in browser! ]`)}` : "")
  );
};

export default async (): Promise<string> => {
  const { webring, projects, stats } = await getMainPage();
  const guestbook = await GuestbookAPI.load().catch(() => null);

  return `
${styleText("bold", primary("Make yourself at home"))}
A quiet place on the web where I keep my projects and ideas

${title("Webring")}
Check out other cool websites ${styleText("gray", "(use your browser)")}:

  ${primary("← prev")}    ${webring.prev.name} ${styleText("gray", `(${webring.prev.url})`)}
  ${primary("- info")}    about Otoring ${styleText("gray", `(${webring.info})`)}
  ${primary("→ next")}    ${webring.next.name} ${styleText("gray", `(${webring.next.url})`)}

${title("Projects")}
Some of my projects. See ${styleText("gray", "/projects")} for more.

  ${projectList(projects)}

${title("Stats")}

  ${primary("- Github")}
  ${orange("★ stars")}      ${stats.github.stars}
  ${orange("☍ commits")}    ${stats.github.commits}

  ${primary("- Tokens wasted")}
  ${orange("✦ total")}      ${stats.tokens.total}
  ${orange("◈ 30 days")}    ${stats.tokens.month}

${title("Guestbook")}
In browser, you can leave a small message, or just say hi.

  ${getGuestbookContent(guestbook)}

${footer()}
\n`;
};
