import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Galery } from "@/components/Profile/Galery/Galery";

export const metadata: Metadata = {
  title: "Галерея",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <Galery />;
}
