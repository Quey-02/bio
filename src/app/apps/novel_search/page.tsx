"use client";

import styles from "./page.module.scss";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { TextField, Button, Spinner } from "@radix-ui/themes";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";

import { useNovelChat } from "@/app/hooks/novel_search";
import { ChatMessage, GenreSelector } from "@/app/components/novel_search";

export default function NovelSearchPage() {
  const {
    messages,
    genres,
    phase,
    isLoading,
    error,
    sessionId,
    initializeChat,
    sendUserMessage,
  } = useNovelChat();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初回マウント時にチャットを開始
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  // メッセージが追加されたら自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const message = inputValue.trim();
    setInputValue("");
    await sendUserMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGenreSelect = async (genreName: string) => {
    await sendUserMessage(genreName);
  };

  const handleRestart = () => {
    initializeChat();
  };

  return (
    <div className={clsx(styles["page-container"])}>
      <div className={clsx(styles["chat-header"])}>
        <h1 className={clsx(styles["title"])}>小説推薦AI</h1>
        <p className={clsx(styles["subtitle"])}>
          あなたにぴったりの小説を見つけます
        </p>
        {sessionId && (
          <Button
            variant="ghost"
            size="1"
            onClick={handleRestart}
            className={clsx(styles["restart-button"])}
          >
            <ReloadIcon />
            最初からやり直す
          </Button>
        )}
      </div>

      <div className={clsx(styles["chat-container"])}>
        <div className={clsx(styles["messages-container"])}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* ジャンル選択フェーズでジャンルボタンを表示 */}
          {phase === "genre_selection" &&
            Object.keys(genres).length > 0 &&
            messages.length > 0 && (
              <GenreSelector
                genres={genres}
                onSelect={handleGenreSelect}
                disabled={isLoading}
              />
            )}

          {/* ローディング表示 */}
          {isLoading && (
            <div className={clsx(styles["loading-container"])}>
              <Spinner size="2" />
              <span>考え中...</span>
            </div>
          )}

          {/* エラー表示 */}
          {error && (
            <div className={clsx(styles["error-container"])}>
              <p>{error}</p>
              <Button variant="soft" size="1" onClick={handleRestart}>
                再試行
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 入力エリア（ジャンル選択フェーズ以外で表示） */}
      {phase !== "genre_selection" && sessionId && (
        <div className={clsx(styles["input-container"])}>
          <TextField.Root
            size="3"
            placeholder="メッセージを入力..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className={clsx(styles["input-field"])}
          />
          <Button
            size="3"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
