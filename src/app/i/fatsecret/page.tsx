import React from "react";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "../../../constants/seo.constants";
import { FatSecret } from "../../../components/Profile/FatSecret/FatSecret";

export const metadata: Metadata = {
  title: "FatSecret",
  ...NO_INDEX_PAGE,
};

export default function I() {
  return <FatSecret />;
}
