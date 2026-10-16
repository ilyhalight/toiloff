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

export const DEFUALT_DATA: StatsData = {
  github: {
    stars: "-",
    commits: "-",
  },
  tokens: {
    total: "-",
    month: "-",
  },
};

export type TopModelTokensData = {
  raw: number;
  formatted: string;
};

export type TopModelTokens = {
  input: TopModelTokensData;
  output: TopModelTokensData;
  cacheRead: TopModelTokensData;
  all: TopModelTokensData;
};

export type TopModelItem = {
  modelId: string;
  model: string;
  lab: string;
  totalTokens: TopModelTokens;
  monthTokens: TopModelTokens;
};

export const load = async () => {
  return await fetchFromAPI<StatsData>("stats");
};

export const getModels = async () => {
  return await fetchFromAPI<TopModelItem[]>("stats/models");
};
