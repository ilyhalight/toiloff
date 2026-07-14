import { z } from "astro/zod";
import { fetchFromAPI } from "./internal";

export const GithubStat = z.object({
  stars: z.string(),
  commits: z.string(),
});

export type GithubStat = z.infer<typeof GithubStat>;

export const TokenStat = z.object({
  month: z.string(),
  total: z.string(),
});

export type TokenStat = z.infer<typeof TokenStat>;

export const StatsData = z.object({
  github: GithubStat,
  tokens: TokenStat,
});

export type StatsData = z.infer<typeof StatsData>;

export const StatsRouteAPI = {
  load: async () => {
    return await fetchFromAPI<StatsData>("stats");
  },
};
