"use client";

import React from "react";
import styles from "./index.module.scss";
import { YMaps, Map } from "@pbe/react-yandex-maps";

export function ContactMap() {
  return (
    <YMaps>
      <div className={styles.maps}>
        <Map defaultState={{ center: [55.916785, 37.755256], zoom: 14 }} />
      </div>
    </YMaps>
  );
}
