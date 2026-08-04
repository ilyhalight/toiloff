import { fetchFromAPI } from "./internal";

export type GithubStat = {
  stars: string;
  commits: string;
};

export type TokenStat = {
  month: string;
  total: string;
};

export type StatsData = {
  github: GithubStat;
  tokens: TokenStat;
};

export const StatsRouteAPI = {
  load: async () => {
    return await fetchFromAPI<StatsData>("stats");
  },
};
