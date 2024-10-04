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
  GALERY: profile + "galery",
  TASK: profile + "task",

  ADMIN_MAIN: admin,
  ADMIN_WEIGHT: admin + "weight",
  ADMIN_USERS: admin + "users",
  ADMIN_FOOD_MONTH: admin + "food_month",
  ADMIN_TASKS: admin + "tasks",
  ADMIN_GALERY: admin + "galery",
};
