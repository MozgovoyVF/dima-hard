import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { AdminGalery } from "@/components/Admin/AdminGalery/AdminGalery";

export const metadata: Metadata = {
  title: "Админ : Галерея",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <AdminGalery />;
}
