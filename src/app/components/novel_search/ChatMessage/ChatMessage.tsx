import styles from "./ChatMessage.module.scss";
import clsx from "clsx";
import type { ChatMessage as ChatMessageType } from "@/types/novel_chat";
import NovelCard from "../NovelCard";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={clsx(
        styles["message-container"],
        isUser ? styles["user"] : styles["assistant"]
      )}
    >
      <div className={clsx(styles["message-bubble"])}>
        <div className={clsx(styles["message-content"])}>
          {message.content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        {message.novels && message.novels.length > 0 && (
          <div className={clsx(styles["novels-container"])}>
            {message.novels.map((novel) => (
              <NovelCard key={novel.ncode} novel={novel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
