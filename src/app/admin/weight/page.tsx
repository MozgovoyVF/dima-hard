import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { WeightInfo } from "@/components/Admin/WeightInfo/WeightInfo";

export const metadata: Metadata = {
  title: "Админ : Вес",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <WeightInfo />;
}
