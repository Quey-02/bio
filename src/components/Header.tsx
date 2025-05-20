// "use client";
import clsx from "clsx";
import React from "react";
import styles from "./Header.module.scss"; // Adjust the path as needed
import Link from "next/link";

export default function Header() {
  return (
    <header className={clsx(styles["header"])}>
      <h1 className={clsx(styles["site-title"])}> koya-jp </h1>
      <div className={clsx(styles["tabs-container"])}>
        <div className={clsx(styles["tab"])}>
          <Link href="/" className={clsx(styles[""])}>
            Top
          </Link>
        </div>
        <div className={clsx(styles["tab"])}>
          <Link href="/techstack" className={clsx(styles[""])}>
            Technology
          </Link>
        </div>
        <div className={clsx(styles["tab"])}>
          <Link href="/projects" className={clsx(styles[""])}>
            Projects
          </Link>
        </div>
        <div className={clsx(styles["tab"])}>
          <Link href="/social" className={clsx(styles[""])}>
            Social
          </Link>
        </div>
        <div className={clsx(styles["apps"])}>
          <Link href="/apps" className={clsx(styles[""])}>
            Apps
          </Link>
        </div>
      </div>
    </header>
  );
}
