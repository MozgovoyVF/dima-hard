import * as React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useLogout } from "@/hooks/useLogout";
import { IProfileUser } from "@/types/user.types";

interface IProfile {
  data: IProfileUser;
}

export function Profile({ data }: IProfile) {
  const { mutate } = useLogout();

  const logout = () => {
    mutate();
  };

  return (
    <div className={styles.profile}>
      <Link href={data.role === "admin" ? DASHBOARD_PAGES.ADMIN_MAIN : DASHBOARD_PAGES.PERSONAL_ACCOUNT}>
        <Image
          src={data?.avatarUrl ? data.avatarUrl : "/images/avatars/user.webp"}
          alt="profile"
          width={30}
          height={30}
        />
      </Link>
      <button onClick={() => logout()} className={styles.button}>
        Выйти
      </button>
    </div>
  );
}
