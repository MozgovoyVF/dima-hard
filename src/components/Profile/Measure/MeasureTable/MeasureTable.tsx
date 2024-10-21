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

export default function MeasureTable({ groupedMeasures, setCurrentChart }: IMeasureTable) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkOverflow = () => {
        if (ref.current && ref.current.firstChild instanceof HTMLElement) {
          setIsOverflow(ref.current.firstChild.offsetWidth > ref.current.clientWidth - 160);
        }
      };

      checkOverflow();
    }
  }, []);

  const measurementKeys = [
    { title: "Обхват груди", measureKey: "chest" },
    { title: "Обхват рук", measureKey: "arms" },
    { title: "Обхват талии", measureKey: "waist" },
    { title: "Обхват низа живота", measureKey: "lowerAbdomen" },
    { title: "Обхват бедер", measureKey: "hips" },
    { title: "Обхват ног под ягодицами", measureKey: "legsUnderButtock" },
    { title: "Обхват икры", measureKey: "calves" },
  ];

  return (
    <div className={styles.table}>
      {isOverflow && (
        <span className={styles.arrow}>
          <FaArrowAltCircleRight />
        </span>
      )}
      <div className={styles.keys}>
        <div className={styles.key}>Дата замеров</div>
        {measurementKeys.map(({ title, measureKey }) => (
          <div
            key={title}
            className={styles.key}
            onClick={() =>
              setCurrentChart({
                title,
                dates: groupedMeasures.createdAt,
                measure: groupedMeasures[measureKey],
              })
            }
          >
            {title} <MdAdsClick />
          </div>
        ))}
      </div>
      <div ref={ref} className={`${styles.values} ${isOverflow ? styles.overflow : ""}`}>
        {Object.keys(groupedMeasures).map((measure) => {
          if (["updatedAt", "userId", "id"].includes(measure)) return null;

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
