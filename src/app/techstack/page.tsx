"use client";
import React from "react";
import TechStackList from "@/components/TechStackList";
import clsx from "clsx";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={clsx(styles["container"])}>
      <TechStackList></TechStackList>
    </div>
  );
}
