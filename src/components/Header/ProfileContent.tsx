"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { MdPersonalInjury } from "react-icons/md";
import Loader from "../ui/loader/Loader";
import { Profile } from "../ui/profile/Profile";

export function ProfileContent() {
  const { data, isLoading, error, isRefetching } = useProfile();
  const [user, setUser] = useState(data);

  useEffect(() => {
    if (error) setUser(undefined);
    else setUser(data);
  }, [data, error]);

  return isRefetching || isLoading ? (
    <Loader />
  ) : user ? (
    <Profile data={user} />
  ) : (
    <Link className={styles.lk} href={DASHBOARD_PAGES.AUTH}>
      <MdPersonalInjury />
      Войти
    </Link>
  );
}
