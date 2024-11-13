"use client";

import ClientOnlyPortal from "@/components/ClientOnlyPortal/ClientOnlyPortal";
import { FeedbackModal } from "@/components/ui/feedbackModal/FeedbackModal";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { FaWhatsapp } from "react-icons/fa";

export function ResultsModal() {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      <div onClick={() => setIsShowModal(true)} className={styles.link}>
        <FaWhatsapp className={styles.whatsapp} />
        <span className={styles.text}>Попробовать потренироваться со мной</span>
      </div>
      <ClientOnlyPortal selector={"#lead"}>
        <FeedbackModal closeFn={() => setIsShowModal(false)} isShowModal={isShowModal} />
      </ClientOnlyPortal>
    </>
  );
}
