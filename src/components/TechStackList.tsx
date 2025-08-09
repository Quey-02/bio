"use client";
import clsx from "clsx";
import React from "react";
import styles from "./TechStackList.module.scss";
import techStack from "@/data/tech-stack.json";
import { TechStack, ProgrammingLanguageProficiency } from "@/types/main";
import TechStackAccordion from "./TechStackItem";

export default function TechStackList() {
  return (
    <ul className={clsx(styles["tech-stack-list"])}>
      {(techStack as TechStack).fields.map(
        (field: ProgrammingLanguageProficiency, fieldIdx) => (
          <li key={fieldIdx} className={clsx(styles["tech-stack-item"])}>
            <TechStackAccordion field={field} />
          </li>
        )
      )}
    </ul>
  );
}
