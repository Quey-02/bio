import React from "react";
import clsx from "clsx";
import styles from "./TechStackItem.module.scss";
import { ProgrammingLanguageProficiency } from "@/types/main";

export function TechStackItem({
  field,
}: {
  field: ProgrammingLanguageProficiency;
}) {
  return (
    <div className={clsx(styles["tech-item"])}>
      <div className={clsx(styles["box-tech-field-caption"])}>
        <h3 className={clsx(styles["tech-field-caption"])}>{field.name}</h3>
      </div>

      <div className={clsx(styles["content"])}>
        {field.modules.map((module) => (
          <div key={module.name} className={clsx(styles["module-item"])}>
            <img
              src={module.icon_uri}
              alt={module.name}
              className={clsx(styles["module-icon"])}
            />
            <div className={clsx(styles["module-name"])}>{module.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechStackItem;
