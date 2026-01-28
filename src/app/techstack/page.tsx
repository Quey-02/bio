"use client";
import React from "react";
import TechStackList from "@/components/TechStackList";
import clsx from "clsx";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={clsx(styles["main-container"])}>
      <h1 className={clsx(styles["page-title"])}>Tech Stack</h1>
      <p className={clsx(styles["page-description"])}>
        使用している技術スタック
      </p>
      <TechStackList />
    </div>
  );
}
