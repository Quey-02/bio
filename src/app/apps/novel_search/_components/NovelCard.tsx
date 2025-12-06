import styles from "./NovelCard.module.scss";
import clsx from "clsx";
import type { NovelInfo } from "@/types/novel_chat";
import { Link2Icon } from "@radix-ui/react-icons";

interface NovelCardProps {
  novel: NovelInfo;
}

export default function NovelCard({ novel }: NovelCardProps) {
  return (
    <div className={clsx(styles["novel-card"])}>
      <div className={clsx(styles["novel-header"])}>
        <h3 className={clsx(styles["novel-title"])}>{novel.title}</h3>
        <a
          href={novel.url}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(styles["novel-link"])}
        >
          <Link2Icon />
          読む
        </a>
      </div>
      <p className={clsx(styles["novel-writer"])}>作者: {novel.writer}</p>
      <p className={clsx(styles["novel-story"])}>{novel.story}</p>
      {novel.keyword && (
        <div className={clsx(styles["novel-keywords"])}>
          {novel.keyword.split(/\s+/).slice(0, 5).map((keyword, index) => (
            <span key={index} className={clsx(styles["keyword-tag"])}>
              {keyword}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
