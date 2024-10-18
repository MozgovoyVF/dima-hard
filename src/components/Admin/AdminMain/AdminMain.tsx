"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import { useChanges } from "@/hooks/changes/useChanges";
import Loader from "@/components/ui/loader/Loader";
import { useState } from "react";
import Image from "next/image";

export function AdminMain() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useChanges(currentPage);

  // Если data есть и у нас вернулись записи
  const totalPages = typeof data !== "string" && data ? Math.ceil(data.total / 10) : 1;
  const hasNextPage = typeof data !== "string" && data ? currentPage < totalPages : false;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <MotionSection>
      <div className={styles.content}>
        <h1 className={styles.title}>Личный кабинет администратора</h1>
        <h2 className={styles.subtitle}>Последние изменения</h2>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {typeof data === "string" && <div className={styles.error}>{data}</div>}

            {typeof data !== "string" && Array.isArray(data?.changes) && (
              <ul className={styles.changes}>
                {data.changes.map((change) => (
                  <li className={styles.change} key={change.id}>
                    <div className={styles.block}>
                      <div className={styles.heading}>
                        <span className={styles.image}>
                          <Image
                            src={change.user?.avatarUrl || "/images/avatars/user.webp"}
                            width={60}
                            height={60}
                            alt="Аватар"
                          />
                        </span>
                        <div className={styles.info}>
                          <span className={styles.email}>{change.user && change.user.email}</span>
                          <span className={styles.date}>
                            {new Date(change.createdAt).toISOString().split("T")[0].split("-").reverse().join(".")}{" "}
                            {new Date(change.createdAt).toISOString().split("T")[1].slice(0, 5)}
                          </span>
                          <span className={styles.name}>
                            {change.user && change.user.name} {change.user && change.user.lastName}
                          </span>
                        </div>
                      </div>
                      <div className={styles.description}>{change.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Пагинация */}
            <div className={styles.pagination}>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={styles.pageButton}
              >
                Назад
              </button>
              <button
                disabled={!hasNextPage}
                onClick={() => handlePageChange(currentPage + 1)}
                className={styles.pageButton}
              >
                Вперед
              </button>
            </div>
          </>
        )}
      </div>
    </MotionSection>
  );
}
