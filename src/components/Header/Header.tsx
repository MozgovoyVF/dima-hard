import styles from "./index.module.scss";
import { FaTelegram } from "react-icons/fa";
import { BiPhone } from "react-icons/bi";
import { PHONE_NUMBER } from "@/constants/global.constants";
import Image from "next/image";
import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { MenuBlock } from "../MenuBlock/MenuBlock";
import { MenuModalContent } from "./MenuModalContent";
import { ProfileContent } from "./ProfileContent";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <MenuModalContent />
        <a className={styles.fatsecret} href="https://www.fatsecret.com">
          <Image
            src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.svg"
            width={130}
            height={30}
            alt="Fatsecret"
          />
        </a>
        <div className={styles.social}>
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
          <Image src="/images/logo.png" alt="logo" width={70} height={70} />
          <div className={styles.info}>
            <h3 className={styles.name}>Дмитрий</h3>
            <h3 className={styles.lastName}>Песчальников</h3>
          </div>
        </Link>
        <ProfileContent />
      </div>
      <div className={styles.bottom}>
        <MenuBlock />
        <a className={styles.fatsecret} href="https://www.fatsecret.com">
          <Image
            src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.svg"
            width={130}
            height={30}
            alt="Fatsecret"
          />
        </a>
        <div className={styles.social}>
          <a target="_blank" href={`https://t.me/${PHONE_NUMBER}`}>
            <FaTelegram className={styles.telegram} />
          </a>
          <a href={`tel:${PHONE_NUMBER}`}>
            <BiPhone className={styles.phone} />
          </a>
        </div>
      </div>
    </div>
  );
}
