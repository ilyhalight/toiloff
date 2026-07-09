import { AuthRouteAPI } from "./auth";
import { GuestbookRouteAPI } from "./guestbook";

export const BackendAPI = {
  guestbook: GuestbookRouteAPI,
  auth: AuthRouteAPI,
};
