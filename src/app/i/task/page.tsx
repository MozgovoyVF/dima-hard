import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Task } from "@/components/Profile/Task/Task";

export const metadata: Metadata = {
  title: "Задачи",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <Task />;
}
