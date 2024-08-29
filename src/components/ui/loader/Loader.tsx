import { LuLoader } from "react-icons/lu";
import styles from "./index.module.scss";

const Loader = () => {
  return (
    <div className={styles.load}>
      <LuLoader className={styles.loader} />
    </div>
  );
};

export default Loader;
