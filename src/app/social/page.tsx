"use client";

import clsx from "clsx";

import styles from "./page.module.scss";

export default function Page() {
  // const router = useRouter();

  return (
    <>
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
    </>
  );
}