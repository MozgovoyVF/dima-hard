import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Tasks } from "@/components/Admin/Tasks/Tasks";

export const metadata: Metadata = {
  title: "Админ : Задачи",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <Tasks />;
}
