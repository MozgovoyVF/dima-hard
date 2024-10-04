import * as React from "react";
import styles from "./index.module.scss";
import { ADMIN_MENU_CONTENT, MENU_CONTENT, PROFILE_MENU_CONTENT } from "@/constants/menu.constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ITask } from "@/types/auth.types";

interface IModal {
  closeFn: () => void;
  subscribe: boolean;
  tasks?: ITask[];
}

export const MenuModal = ({ closeFn, subscribe, tasks }: IModal) => {
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
              ? PROFILE_MENU_CONTENT.map((item) => {
                  return (
                    <li key={item.title} onClick={() => closeFn()} className={styles.item}>
                      <Link className={styles.link} href={item.link}>
                        {<item.icon />} {item.title}{" "}
                        {item.title === "Задачи" && tasks && tasks.length > 0 && (
                          <span className={styles.taskCount}>{tasks.filter((task) => !task.completed).length}</span>
                        )}
                      </Link>
                    </li>
                  );
                })
              : path.startsWith("/admin")
              ? ADMIN_MENU_CONTENT.map((item) => (
                  <li key={item.title} onClick={() => closeFn()} className={styles.item}>
                    <Link className={styles.link} href={item.link}>
                      {<item.icon />} {item.title}
                    </Link>
                  </li>
                ))
              : MENU_CONTENT.map((item) => (
                  <li key={item.title} onClick={() => closeFn()} className={styles.item}>
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
