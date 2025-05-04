"use client";
import clsx from "clsx";
import React from "react";
import styles from "./TechStackList.module.scss";
import techStack from "@/data/tech-stack.json";
import { TechStack, ProgrammingLanguageProficiency } from "@/types/main";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function TechStackAccordionItem({
  field,
}: {
  field: ProgrammingLanguageProficiency;
}) {
  return (
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
              <div className={clsx(styles["programming-language-name"])}>
                {field.name}
              </div>
              <ChevronDownIcon
                className={clsx(styles["accordion-chervon"])}
                aria-hidden
              />
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className={clsx(styles["modules"])}>
              <ul className={clsx(styles["module-list"])}>
                {field.modules.map((module) => (
                  <li key={module.name} className={clsx(styles["module-item"])}>
                    <img
                      src={module.icon_uri}
                      alt={module.name}
                      className={clsx(styles["module-icon"])}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.Content>
        </Accordion.Header>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default function TechStackList() {
  return (
    <div className={clsx(styles["tech-stack-list"])}>
      {(techStack as TechStack).fields.map(
        (field: ProgrammingLanguageProficiency) => (
          <div key={field.name} className={clsx(styles["tech-item"])}>
            <TechStackAccordionItem field={field} />
          </div>
        )
      )}
    </div>
  );
}
