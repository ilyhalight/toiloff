import { styleText } from "node:util";

import { getModelsPage } from "#lib/api/bff.ts";
import { calcTableGaps, orange, title } from "../utils";
import { projectList } from "../components/projectList.ts";
import { footer } from "../components/footer.ts";

const tablePlaceColor = (idx: number) => {
  switch (idx) {
    case 0: {
      return (text: string) => styleText("gray", text);
    }
    case 1: {
      return orange;
    }
    case 2: {
      return (text: string) => styleText("blueBright", text);
    }
    case 3: {
      return (text: string) => styleText("yellow", text);
    }
    default: {
      return (text: string) => text;
    }
  }
};

export default async (): Promise<string> => {
  const { models, stats } = await getModelsPage();

  const table = models.reduce(
    (acc, model, idx) => {
      acc.push([
        `${idx + 1}`,
        model.model,
        model.lab,
        model.totalTokens.all.formatted,
        model.monthTokens.all.formatted,
      ]);
      return acc;
    },
    [["№", "Model", "Lab", "Total", "Month"]],
  );

  const tableGaps = calcTableGaps(table);

  return `
${title("Models")}
My top models by usage

  ${orange("✦ TOTAL")} ${stats.tokens.total}
  ${orange("◈ MONTH")} ${stats.tokens.month}

${table
  .map((row, idx) => {
    let prepend = "";
    if (idx === 1) {
      prepend += styleText(
        "gray",
        "  " + tableGaps.map((gap) => "-".repeat(gap)).join("  |  ") + "\n",
      );
    }

    return (
      prepend +
      tablePlaceColor(idx)(`  ${row.map((cell, idx) => cell.padEnd(tableGaps[idx])).join("  |  ")}`)
    );
  })
  .join("\n")}

${footer()}
\n`;
};
