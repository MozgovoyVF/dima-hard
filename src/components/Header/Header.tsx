"use client";

import { useRef, useState } from "react";
import styles from "./index.module.scss";
import { Squash as Hamburger } from "hamburger-react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { BiPhone } from "react-icons/bi";
import { PHONE_NUMBER } from "@/constants/global.constants";
import gsap from "gsap";
import ClientOnlyPortal from "@/components/ClientOnlyPortal/ClientOnlyPortal";
import { MenuModal } from "@/components/MenuModal/MenuModal";
import Image from "next/image";
import { Button } from "../ui/buttons/Button";
import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { MdPersonalInjury } from "react-icons/md";

export function Header() {
  const [isShowModal, setIsShowModal] = useState(false);
  const el = useRef(null);

  const appear = () => {
    setIsShowModal(true);
  };

  const fade = () => {
    gsap.to(el.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => setIsShowModal(false),
    });
  };

  return (
    <div className={styles.header}>
      {isShowModal ? (
        <ClientOnlyPortal selector={"#modal"}>
          <MenuModal ref={el} closeFn={() => fade()} />
        </ClientOnlyPortal>
      ) : null}
      <div className={styles.top}>
        <Hamburger
          toggled={isShowModal}
          size={20}
          toggle={!isShowModal ? appear : fade}
        />
        <div className={styles.social}>
          <a target="_blank" href={`https://wa.me/${PHONE_NUMBER}`}>
            <FaWhatsapp className={styles.whatsapp} />
          </a>
          <a target="_blank" href={`https://t.me/${PHONE_NUMBER}`}>
            <FaTelegram className={styles.telegram} />
          </a>
          <a href={`tel:${PHONE_NUMBER}`}>
            <BiPhone className={styles.phone} />
          </a>
        </div>
      </div>
      <div className={styles.main}>
        <Link href={DASHBOARD_PAGES.HOME} className={styles.logo}>
          <Image src="/images/logo.png" alt="logo" width={80} height={80} />
          <div className={styles.info}>
            <h3 className={styles.name}>Дмитрий</h3>
            <h3 className={styles.lastName}>Песчальников</h3>
          </div>
        </Link>
        <Link className={styles.lk} href={DASHBOARD_PAGES.AUTH}>
          <MdPersonalInjury />
          Войти
        </Link>
      </div>
    </div>
  );
}
