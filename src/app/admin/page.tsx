import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { AdminMain } from "@/components/Admin/AdminMain/AdminMain";

export const metadata: Metadata = {
  title: "Админ Панель",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <AdminMain />;
}
