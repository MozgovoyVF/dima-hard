import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { AdminMeasure } from "@/components/Admin/AdminMeasure/AdminMeasure";

export const metadata: Metadata = {
  title: "Админ : Антропометрия",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <AdminMeasure />;
}
