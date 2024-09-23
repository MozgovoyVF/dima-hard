import { Account } from "@/components/Profile/Account/Account";
import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Аккаунт",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <Account />;
}
