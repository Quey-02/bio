"use client";

import styles from "./page.module.scss";
import clsx from "clsx";

export default function Page() {
  return (
    <div className={clsx(styles["main-container"])}>
      <h1>koyakoya top</h1>
    </div>
  );
}
