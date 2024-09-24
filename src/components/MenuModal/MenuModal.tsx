import * as React from "react";
import styles from "./index.module.scss";
import { ADMIN_MENU_CONTENT, MENU_CONTENT, PROFILE_MENU_CONTENT } from "@/constants/menu.constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFatsecret } from "@/hooks/useFatsecret";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

interface IModal {
  closeFn: () => void;
  subscribe: boolean;
}

export const MenuModal = ({ closeFn, subscribe }: IModal) => {
  const path = usePathname();
  let data = null;

  if (path.startsWith("/i")) {
    const { data: fatsecretData } = useFatsecret();
    data = fatsecretData;
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      key={1}
      className={styles.modal}
    >
      <div className={styles.window}>
        <div className={styles.content}>
          <ul className={styles.list}>
            {path.startsWith("/i")
              ? PROFILE_MENU_CONTENT.map((item) => {
                  if ((data || !subscribe) && item.link === DASHBOARD_PAGES.FATSECRET) return;
                  return (
                    <li key={item.title} onClick={() => closeFn()} className="item">
                      <Link className={styles.link} href={item.link}>
                        {<item.icon />} {item.title}
                      </Link>
                    </li>
                  );
                })
              : path.startsWith("/admin")
              ? ADMIN_MENU_CONTENT.map((item) => (
                  <li key={item.title} onClick={() => closeFn()} className="item">
                    <Link className={styles.link} href={item.link}>
                      {<item.icon />} {item.title}
                    </Link>
                  </li>
                ))
              : MENU_CONTENT.map((item) => (
                  <li key={item.title} onClick={() => closeFn()} className="item">
                    <Link className={styles.link} href={item.link}>
                      {<item.icon />} {item.title}
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

MenuModal.displayName = "menuModal";
