"use client";

import styles from "./page.module.scss";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { TextField, Button, Spinner, TextArea } from "@radix-ui/themes";
import { PaperPlaneIcon, ReloadIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

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
  const [showSelectionMode, setShowSelectionMode] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [keywords, setKeywords] = useState("");
  const [freeText, setFreeText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初回マウント時にジャンル情報を取得
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  // メッセージが追加されたら自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Selection Firstで検索開始
  const handleSelectionSearch = async () => {
    if (isLoading) return;

    const request: {
      genre?: string;
      keywords?: string[];
      free_text?: string;
    } = {};

    if (selectedGenre) {
      request.genre = selectedGenre;
    }
    if (keywords.trim()) {
      request.keywords = keywords.split(/[,、\s]+/).filter(k => k.trim());
    }
    if (freeText.trim()) {
      request.free_text = freeText.trim();
    }

    // 少なくとも1つの条件が必要
    if (!request.genre && !request.keywords?.length && !request.free_text) {
      return;
    }

    setShowSelectionMode(false);
    await initializeChat(request);
  };

  // 従来のチャットモードで開始
  const handleStartChatMode = async () => {
    setShowSelectionMode(false);
    await initializeChat();
  };

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
    setShowSelectionMode(true);
    setSelectedGenre("");
    setKeywords("");
    setFreeText("");
    setInputValue("");
    initializeChat();
  };

  // Selection First UI
  if (showSelectionMode && Object.keys(genres).length > 0) {
    return (
      <div className={clsx(styles["page-container"])}>
        <div className={clsx(styles["chat-header"])}>
          <h1 className={clsx(styles["title"])}>小説推薦AI</h1>
          <p className={clsx(styles["subtitle"])}>
            あなたにぴったりの小説を見つけます
          </p>
        </div>

        <div className={clsx(styles["selection-container"])}>
          <div className={clsx(styles["selection-section"])}>
            <h3 className={clsx(styles["selection-label"])}>ジャンル（任意）</h3>
            <div className={clsx(styles["genre-buttons"])}>
              {Object.entries(genres).map(([key, name]) => (
                <Button
                  key={key}
                  variant={selectedGenre === key ? "solid" : "soft"}
                  size="2"
                  onClick={() => setSelectedGenre(selectedGenre === key ? "" : key)}
                  disabled={isLoading}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>

          <div className={clsx(styles["selection-section"])}>
            <h3 className={clsx(styles["selection-label"])}>キーワード（任意）</h3>
            <TextField.Root
              size="3"
              placeholder="例: 異世界転生、魔法、冒険"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className={clsx(styles["selection-section"])}>
            <h3 className={clsx(styles["selection-label"])}>希望する作品の雰囲気（任意）</h3>
            <TextArea
              size="3"
              placeholder="例: ダークファンタジーで、主人公が成長していく物語が読みたい"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className={clsx(styles["selection-actions"])}>
            <Button
              size="3"
              onClick={handleSelectionSearch}
              disabled={isLoading || (!selectedGenre && !keywords.trim() && !freeText.trim())}
            >
              <MagnifyingGlassIcon />
              検索する
            </Button>
            <Button
              size="3"
              variant="soft"
              onClick={handleStartChatMode}
              disabled={isLoading}
            >
              対話モードで探す
            </Button>
          </div>

          {isLoading && (
            <div className={clsx(styles["loading-container"])}>
              <Spinner size="2" />
              <span>検索中...</span>
            </div>
          )}

          {error && (
            <div className={clsx(styles["error-container"])}>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

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
            placeholder={phase === "completed" ? "条件を追加して再検索（例: もっとアクション多め）" : "メッセージを入力..."}
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
