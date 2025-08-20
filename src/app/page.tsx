"use client";

import styles from "./page.module.scss";
import clsx from "clsx";

export default function Page() {
  return (
    <div className={clsx(styles["main-container"])}>
      <h2>About Me</h2>
      <div>工事中</div>
    </div>
  );
}
