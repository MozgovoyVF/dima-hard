import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Users } from "@/components/Admin/Users/Users";

export const metadata: Metadata = {
  title: "Админ : Пользователи",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <Users />;
}
