import clsx from "clsx";
import React from "react";
import styles from "./TechStackList.module.scss";
import techStack from "@/data/tech-stack.json";
import { TechStack } from "@/types/main";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function TechStackList() {
  return (
    <div className={clsx(styles["tech-stack-list"])}>
      {(techStack as TechStack).programingLanguages.map(
        (programmingLanguageItem) => (
          <div
            key={programmingLanguageItem.name}
            className={clsx(styles["tech-item"])}
          >
            <Accordion.Root
              type="single"
              collapsible
              className={clsx(styles["accordion"])}
              defaultValue="item-1"
            >
              <Accordion.Item value="item-1">
                <Accordion.Header className={clsx(styles["header"])}>
                  <Accordion.Trigger
                    className={clsx(styles["accordion-trigger"])}
                  >
                    <div className={clsx(styles["caption"])}>
                      <img
                        src={programmingLanguageItem.icon_uri}
                        alt={programmingLanguageItem.name}
                        className={clsx(styles["icon"])}
                      />
                      <div
                        className={clsx(styles["programming-language-name"])}
                      >
                        {programmingLanguageItem.name}
                      </div>
                      <ChevronDownIcon
                        className={clsx(styles["accordion-chervon"])}
                        aria-hidden
                      />
                    </div>
                  </Accordion.Trigger>
                  <Accordion.Content>
                    {/* <div className={clsx(styles['level'])}>レベル: {programmingLanguageItem.level}</div> */}
                    <div className={clsx(styles["modules"])}>
                      <h3>モジュール</h3>
                      <ul className={clsx(styles["module-list"])}>
                        {programmingLanguageItem.modules.map((module) => (
                          <li
                            key={module.name}
                            className={clsx(styles["module-item"])}
                          >
                            {module.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Accordion.Content>
                </Accordion.Header>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        )
      )}
    </div>
  );
}
