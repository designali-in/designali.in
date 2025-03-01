import { env } from "@/env";

export const SENDER_EMAIL = process.env.AUTHOR_EMAIL || "onboarding@resend.dev";

export const isProduction = process.env.NODE_ENV === "production";

export const SITE_URL = isProduction
  ? "https://designali.in"
  : "http://localhost:3000";

export const BASE_URL = isProduction
  ? "https://designali.in"
  : "http://localhost:3000";

export const GITHUB_USERNAME = "designali";

export const SITE_NAME = "Ali";
export const SITE_TITLE = "Ali - A Full Stack Developer";
export const SITE_DESCRIPTION = "Ali • 18 y/o • Student • Full Stack Developer";
export const SITE_KEYWORDS = [
  "designali",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
];

export const SITE_GITHUB_URL = "https://github.com/designali";
export const SITE_FACEBOOK_URL = "https://www.facebook.com/designali";
export const SITE_INSTAGRAM_URL = "https://www.instagram.com/designali.in";
export const SITE_X_URL = "https://x.com/designali";
export const SITE_YOUTUBE_URL = "https://www.youtube.com/@designali";

export const INFINITE_SCROLLING_PAGINATION_ANIME = 10;
export const INFINITE_SCROLLING_PAGINATION_RESULTS = 5;
export const INFINITE_SCROLLING_PAGINATION_LEADERBOARD = 10;
export const INFINITE_SCROLLING_PAGINATION_BROWSE = 10;

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  CREATED: 201,
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  CONFLICT: 409,
  NOT_ACCEPTABLE: 406,
};

const HTTP_HEADERS = {
  "Content-Type": "application/json",
};

export const RESPONSE = (data: any, status: number) => {
  return Response.json(data, {
    headers: HTTP_HEADERS,
    status: status,
  });
};
