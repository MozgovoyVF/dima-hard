import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { UserAgreement } from "@/components/UserAgreement/UserAgreement";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <UserAgreement />;
}
