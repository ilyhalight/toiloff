import { PUBLIC_API_BASE_URL } from "astro:env/client";

export default {
  challengeUrl: `${PUBLIC_API_BASE_URL}/captcha/challenge`,
} as const;
