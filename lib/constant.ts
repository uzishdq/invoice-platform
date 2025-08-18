export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/auth/login",
    VERIFY: "/auth/verify",
  },
  AUTH: {
    DASHBOARD: "/dashboard",
    ONBOARDING: "/dashboard/onboarding",
    INVOICES: "/dashboard/invoices",
    CREATE_INVOICES: "/dashboard/invoices/create-invoice",
  },
};

export const PUBLIC_ROUTES = [
  ROUTES.PUBLIC.HOME,
  ROUTES.PUBLIC.LOGIN,
  ROUTES.PUBLIC.VERIFY,
];
export const DEFAULT_AUTH = "/api/auth";
export const DEFAULT_API_URL = "/api";
