"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { ADMIN_MENU_CONTENT, MENU_CONTENT, PROFILE_MENU_CONTENT } from "@/constants/menu.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CgMenuRound } from "react-icons/cg";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";

export const MenuBlock = () => {
  const path = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const { data } = useProfile();

  return (
    <div className={styles.content}>
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className={`${styles.button} ${isVisible && styles.visible}`}
      >
        Меню <CgMenuRound />
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.ul
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className={styles.list}
          >
            {path.startsWith("/admin") || data?.role === "admin"
              ? ADMIN_MENU_CONTENT.map((item) => (
                  <li key={item.title} className={styles.item}>
                    <Link className={styles.link} href={item.link} onClick={() => setIsVisible((prev) => !prev)}>
                      {<item.icon />}
                      {item.title}
                    </Link>
                  </li>
                ))
              : path.startsWith("/i")
              ? PROFILE_MENU_CONTENT.map((item) => {
                  return (
                    <li key={item.title} className={styles.item}>
                      <Link className={styles.link} href={item.link} onClick={() => setIsVisible((prev) => !prev)}>
                        {<item.icon />}
                        {item.title}{" "}
                        {item.title === "Задачи" && data?.task && data?.task.length > 0 && (
                          <span className={styles.taskCount}>{data.task.filter((task) => !task.completed).length}</span>
                        )}
                      </Link>
                    </li>
                  );
                })
              : MENU_CONTENT.map((item) => (
                  <li key={item.title} className={styles.item}>
                    <Link className={styles.link} href={item.link} onClick={() => setIsVisible((prev) => !prev)}>
                      {<item.icon />}
                      {item.title}
                    </Link>
                  </li>
                ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

MenuBlock.displayName = "menuBlock";
