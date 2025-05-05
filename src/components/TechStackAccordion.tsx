import React from "react";
import clsx from "clsx";
import styles from "./TechStackAccordion.module.scss";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ProgrammingLanguageProficiency } from "@/types/main";

export function TechStackAccordion({
  field,
}: {
  field: ProgrammingLanguageProficiency;
}) {
  return (
    <div key={field.name} className={clsx(styles["tech-item"])}>
      <Accordion.Root
        type="single"
        collapsible
        className={clsx(styles["accordion"])}
        defaultValue="item-1"
      >
        <Accordion.Item value="item-1">
          <Accordion.Header className={clsx(styles["header"])}>
            <Accordion.Trigger className={clsx(styles["accordion-trigger"])}>
              <div className={clsx(styles["caption"])}>
                <div className={clsx(styles["field-name"])}>{field.name}</div>
                <ChevronDownIcon
                  className={clsx(styles["accordion-chervon"])}
                  aria-hidden
                />
              </div>
            </Accordion.Trigger>
            <Accordion.Content
              className={clsx(styles["content"], styles["module-list"])}
            >
              {field.modules.map((module) => (
                <div key={module.name} className={clsx(styles["module-item"])}>
                  <img
                    src={module.icon_uri}
                    alt={module.name}
                    className={clsx(styles["module-icon"])}
                  />
                  <div className={clsx(styles["module-name"])}>
                    {module.name}
                  </div>
                </div>
              ))}
            </Accordion.Content>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}

export default TechStackAccordion;
