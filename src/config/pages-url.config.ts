"use client";

const root = "/";
const profile = "/i/";
const admin = "/admin/";

export const DASHBOARD_PAGES = {
  HOME: root,
  PERSONAL_ACCOUNT: profile,
  AUTH: root + "auth",
  CALC: profile + "calc",
  SETTINGS: profile + "settings",
  FATSECRET: profile + "fatsecret",

  ADMIN_MAIN: admin,
  ADMIN_WEIGHT: admin + "weight",
  ADMIN_USERS: admin + "users",
};
