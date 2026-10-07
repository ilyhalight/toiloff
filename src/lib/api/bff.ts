import { fetchFromAPI } from "./internal";

import type { Projects } from "./projects";
import type { StatsData, TopModelItem } from "./stats";
import type { WebringData } from "./webring";

export type BFFMainPage = {
  stats: StatsData;
  webring: WebringData;
  projects: Projects;
};

export type BFFModelsPage = {
  stats: StatsData;
  models: TopModelItem[];
};

export const BffRouteAPI = {
  getMainPage: async () => {
    return await fetchFromAPI<BFFMainPage>("bff");
  },
};

export const getModelsPage = async () => {
  return await fetchFromAPI<BFFModelsPage>("bff/models");
};
