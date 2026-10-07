import { AdminImagesRouteAPI } from "./adminImages";
import { AuthRouteAPI } from "./auth";
import { GuestbookRouteAPI } from "./guestbook";
import { ProjetsRouteAPI } from "./projects";
import { StatsRouteAPI } from "./stats";
import { WebringRouteAPI } from "./webring";
import { BffRouteAPI } from "./bff";

export const BackendAPI = {
  guestbook: GuestbookRouteAPI,
  auth: AuthRouteAPI,
  stats: StatsRouteAPI,
  projects: ProjetsRouteAPI,
  adminImages: AdminImagesRouteAPI,
  webring: WebringRouteAPI,
  bff: BffRouteAPI,
};
