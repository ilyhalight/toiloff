import { AuthRouteAPI } from "./auth";
import { GuestbookRouteAPI } from "./guestbook";
import { ProjetsRouteAPI } from "./projects";
import { StatsRouteAPI } from "./stats";

export const BackendAPI = {
  guestbook: GuestbookRouteAPI,
  auth: AuthRouteAPI,
  stats: StatsRouteAPI,
  projects: ProjetsRouteAPI,
};
