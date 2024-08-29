import { Auth } from "../../components/Auth/Auth";
import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Auth",
  ...NO_INDEX_PAGE,
};

export default function AuthPage() {
  return <Auth />;
}
