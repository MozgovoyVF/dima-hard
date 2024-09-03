import * as React from "react";
import styles from "./index.module.scss";
import { MENU_CONTENT, PROFILE_MENU_CONTENT } from "@/constants/menu.constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface IModal {
  closeFn: () => void;
}

export const MenuModal = ({ closeFn }: IModal) => {
  const path = usePathname();

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
              ? PROFILE_MENU_CONTENT.map((item) => (
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
