import * as React from "react";
import styles from "./index.module.scss";
import { ADMIN_MENU_CONTENT, MENU_CONTENT, PROFILE_MENU_CONTENT } from "@/constants/menu.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ITask } from "@/types/auth.types";
import { AnimatePresence, motion } from "framer-motion";
import { CgMenuRound } from "react-icons/cg";

interface IModal {
  closeFn: () => void;
  tasks?: ITask[];
  role?: "admin" | "user";
  setIsVisible: () => void;
  isVisible: boolean;
}

export const MenuBlock = ({ closeFn, tasks, role, setIsVisible, isVisible }: IModal) => {
  const path = usePathname();

  return (
    <div className={styles.content}>
      <button onClick={setIsVisible} className={styles.button}>
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
            {path.startsWith("/admin") || role === "admin"
              ? ADMIN_MENU_CONTENT.map((item) => (
                  <li key={item.title} onClick={() => closeFn()} className={styles.item}>
                    <Link className={styles.link} href={item.link}>
                      {<item.icon />}
                      {item.title}
                    </Link>
                  </li>
                ))
              : path.startsWith("/i")
              ? PROFILE_MENU_CONTENT.map((item) => {
                  return (
                    <li key={item.title} onClick={() => closeFn()} className={styles.item}>
                      <Link className={styles.link} href={item.link}>
                        {<item.icon />}
                        {item.title}{" "}
                        {item.title === "Задачи" && tasks && tasks.length > 0 && (
                          <span className={styles.taskCount}>{tasks.filter((task) => !task.completed).length}</span>
                        )}
                      </Link>
                    </li>
                  );
                })
              : MENU_CONTENT.map((item) => (
                  <li key={item.title} onClick={() => closeFn()} className={styles.item}>
                    <Link className={styles.link} href={item.link}>
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
