import { Main } from "@/components/Main/Main";

import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Better every day",
  ...NO_INDEX_PAGE,
};

export default function Home() {
  return <Main />;
}
