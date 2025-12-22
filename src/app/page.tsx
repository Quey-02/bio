"use client";

import styles from "./page.module.scss";
import clsx from "clsx";

export default function Page() {
  return (
    <div className={clsx(styles["main-container"])}>
      <h2>About Me</h2>
      <div>工事中</div>

      <button
        className={clsx(styles["github-link"])}
        onClick={() => {
          window.open("https://github.com/Quey-02", "_blank");
        }}
      >
        <div className={clsx(styles["github-link-item"])}>
          <img
            src="github.svg"
            alt="github"
            className={clsx(styles["github-icon"])}
          />
          <div className={clsx(styles["github-link-text"])}>@Quey-02</div>
        </div>
      </button>
    </div>
  );
}
