export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/auth/login",
    VERIFY: "/auth/verify",
  },
  AUTH: {
    DASHBOARD: "/dashboard",
  },
};

export const PUBLIC_ROUTES = [
  ROUTES.PUBLIC.HOME,
  ROUTES.PUBLIC.LOGIN,
  ROUTES.PUBLIC.VERIFY,
];
export const DEFAULT_AUTH = "/api/auth";
export const DEFAULT_API_URL = "/api";
