import * as React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useLogout } from "@/hooks/useLogout";
import { IProfileUser } from "@/types/user.types";
import { ImExit } from "react-icons/im";
import { motion } from "framer-motion";

interface IProfile {
  data: IProfileUser;
}

const variants = {
  hidden: { opacity: 0, y: -20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export function Profile({ data }: IProfile) {
  const { mutate } = useLogout();

  const logout = () => {
    mutate();
  };

  return (
    <motion.div
      key="account"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "easi-in-out", duration: 0.6 }}
      className={styles.profile}
    >
      <Link href={data.role === "admin" ? DASHBOARD_PAGES.ADMIN_MAIN : DASHBOARD_PAGES.PERSONAL_ACCOUNT}>
        <Image
          src={data?.avatarUrl ? data.avatarUrl : "/images/avatars/user.webp"}
          alt="profile"
          width={30}
          height={30}
          placeholder="blur"
          blurDataURL="/images/avatars/user.webp" // Путь к низкокачественному изображению
        />
      </Link>
      <button onClick={() => logout()} className={styles.button}>
        <ImExit />
      </button>
    </motion.div>
  );
}
