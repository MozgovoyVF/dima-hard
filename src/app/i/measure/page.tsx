import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Measure } from "@/components/Profile/Measure/Measure";

export const metadata: Metadata = {
  title: "Антропометрия",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <Measure />;
}
