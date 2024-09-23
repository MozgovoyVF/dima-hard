import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Settings } from "@/components/Profile/Settings/Settings";

export const metadata: Metadata = {
  title: "Настройки",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <Settings />;
}
