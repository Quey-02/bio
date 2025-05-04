"use client";
import clsx from "clsx";
import React from "react";
import styles from "./TechStackList.module.scss";
import techStack from "@/data/tech-stack.json";
import { TechStack, ProgrammingLanguageProficiency } from "@/types/main";
import TechStackAccordion from "./TechStackAccordion";

export default function TechStackList() {
  return (
    <div className={clsx(styles["tech-stack-list"])}>
      {(techStack as TechStack).fields.map(
        (field: ProgrammingLanguageProficiency, fieldIdx) => (
          <TechStackAccordion key={fieldIdx} field={field} />
        )
      )}
    </div>
  );
}
