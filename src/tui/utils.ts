import type { APIContext } from "astro";

// 30 secs in ms
// const cacheTTL = 30_000;
const cacheTTL = 1_000;
const cache = new Map<string, { content: string; cachedAt: number }>();

export const cached = async (
  context: APIContext,
  handler: (context: APIContext) => Promise<string>,
) => {
  const pathname = context.url.pathname;
  const value = cache.get(pathname);
  if (value && Date.now() - value.cachedAt < cacheTTL) {
    return value.content;
  }

  try {
    const content = await handler(context);
    cache.set(pathname, { content, cachedAt: Date.now() });
    return content;
  } catch {
    return `looks like i broke something ${primary("><")}\n\n${gray("Please check it later or try to use browser...")}\n`;
  }
};

export const rgb = (r: number, g: number, b: number) => (text: string) =>
  `\x1b[38;2;${r};${g};${b}m${text}\x1b[39m`;

export const hex = (h: string) => {
  const n = parseInt(h.replace("#", ""), 16);
  return rgb((n >> 16) & 255, (n >> 8) & 255, n & 255);
};

export const primary = hex("#ff6363");
export const orange = hex("#FDBF07");
export const gray = hex("#808080");

export const bold = (text: string) => `\x1b[1m${text}\x1b[22m`;
export const title = (text: string) =>
  `${primary("≪ ")}${hex("#FFD1FB")("✿")} ${text} ${primary("≫")}`;

export const calcTableGaps = (table: string[][]) =>
  table[0].map((_, idx) => {
    return Math.max(...table.map((row) => row[idx].length).sort((a, b) => a - b));
  });
