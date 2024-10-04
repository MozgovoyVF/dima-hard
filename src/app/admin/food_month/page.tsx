import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { FoodMonth } from "@/components/Admin/FoodMonth/FoodMonth";

export const metadata: Metadata = {
  title: "Админ : Питание",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <FoodMonth />;
}
