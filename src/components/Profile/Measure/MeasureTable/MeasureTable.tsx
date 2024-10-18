import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { MdAdsClick } from "react-icons/md";
import { FaArrowAltCircleRight } from "react-icons/fa";

interface IMeasureTable {
  groupedMeasures: Record<string, any[]>;
  setCurrentChart: Dispatch<
    SetStateAction<
      | {
          dates: string[];
          measure: string[];
          title: string;
        }
      | undefined
    >
  >;
}

export function MeasureTable({ groupedMeasures, setCurrentChart }: IMeasureTable) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (ref.current && ref.current.firstChild instanceof HTMLElement) {
      setIsOverflow(ref.current.firstChild.offsetWidth > window.innerWidth - 160);
    }
  }, []);

  return (
    <div className={styles.table}>
      {isOverflow && (
        <span className={styles.arrow}>
          <FaArrowAltCircleRight />
        </span>
      )}
      <div className={styles.keys}>
        <div className={styles.key}>Дата замеров</div>
        <div
          className={styles.key}
          onClick={() =>
            setCurrentChart({
              title: "Обхват груди",
              dates: groupedMeasures.createdAt,
              measure: groupedMeasures.chest,
            })
          }
        >
          Обхват груди <MdAdsClick />
        </div>
        <div
          className={styles.key}
          onClick={() =>
            setCurrentChart({
              title: "Обхват рук",
              dates: groupedMeasures.createdAt,
              measure: groupedMeasures.arms,
            })
          }
        >
          Обхват рук <MdAdsClick />
        </div>
        <div
          className={styles.key}
          onClick={() =>
            setCurrentChart({
              title: "Обхват талии",
              dates: groupedMeasures.createdAt,
              measure: groupedMeasures.waist,
            })
          }
        >
          Обхват талии <MdAdsClick />
        </div>
        <div
          className={styles.key}
          onClick={() =>
            setCurrentChart({
              title: "Обхват низа живота",
              dates: groupedMeasures.createdAt,
              measure: groupedMeasures.lowerAbdomen,
            })
          }
        >
          Обхват низа живота <MdAdsClick />
        </div>
        <div
          className={styles.key}
          onClick={() =>
            setCurrentChart({
              title: "Обхват бедер",
              dates: groupedMeasures.createdAt,
              measure: groupedMeasures.hips,
            })
          }
        >
          Обхват бедер <MdAdsClick />
        </div>
        <div
          className={styles.key}
          onClick={() =>
            setCurrentChart({
              title: "Обхват ног под ягодицами",
              dates: groupedMeasures.createdAt,
              measure: groupedMeasures.legsUnderButtock,
            })
          }
        >
          Обхват ног под ягодицами <MdAdsClick />
        </div>
        <div
          className={styles.key}
          onClick={() =>
            setCurrentChart({
              title: "Обхват икры",
              dates: groupedMeasures.createdAt,
              measure: groupedMeasures.calves,
            })
          }
        >
          Обхват икры <MdAdsClick />
        </div>
      </div>
      <div ref={ref} className={`${styles.values} ${isOverflow && styles.overflow}`}>
        {Object.keys(groupedMeasures).map((measure) => {
          if (measure === "updatedAt" || measure === "userId" || measure === "id") return;

          return (
            <div key={measure} className={styles.row}>
              {groupedMeasures[measure].map((value, index) => (
                <div key={index} className={styles.value}>
                  {measure === "createdAt"
                    ? new Date(value).toISOString().split("T")[0].split("-").reverse().slice(0, 2).join(".")
                    : value}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
