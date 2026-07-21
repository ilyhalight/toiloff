import { AdminImagesRouteAPI } from "./adminImages";
import { AuthRouteAPI } from "./auth";
import { GuestbookRouteAPI } from "./guestbook";
import { ProjetsRouteAPI } from "./projects";
import { StatsRouteAPI } from "./stats";
import { WebringRouteAPI } from "./webring";

export const BackendAPI = {
  guestbook: GuestbookRouteAPI,
  auth: AuthRouteAPI,
  stats: StatsRouteAPI,
  projects: ProjetsRouteAPI,
  adminImages: AdminImagesRouteAPI,
  webring: WebringRouteAPI,
};
