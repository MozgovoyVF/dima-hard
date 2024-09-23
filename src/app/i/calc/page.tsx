import { Calculator } from "@/components/Profile/Calculator/Calculator";
import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Калькулятор",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <Calculator />;
}
