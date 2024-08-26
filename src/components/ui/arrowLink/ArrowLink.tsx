import * as React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { FaArrowAltCircleUp } from "react-icons/fa";

export function ArrowLink() {
  return (
    <Link href={"/#banner"} className={styles.arrowLink}>
      <FaArrowAltCircleUp />
    </Link>
  );
}
