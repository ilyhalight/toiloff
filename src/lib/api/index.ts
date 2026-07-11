import { AuthRouteAPI } from "./auth";
import { GuestbookRouteAPI } from "./guestbook";
import { StatsRouteAPI } from "./stats";

export const BackendAPI = {
  guestbook: GuestbookRouteAPI,
  auth: AuthRouteAPI,
  stats: StatsRouteAPI,
};
