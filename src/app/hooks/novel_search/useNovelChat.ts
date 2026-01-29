import { useState, useCallback } from "react";
import { startChat, sendMessage } from "@/utils/novel_chat/api";
import type {
  ChatMessage,
  ChatPhase,
  GenreMap,
  StartChatRequest,
  NovelInfo,
} from "@/types/novel_chat";

interface UseNovelChatReturn {
  messages: ChatMessage[];
  genres: GenreMap;
  phase: ChatPhase;
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;
  novels: NovelInfo[];
  initializeChat: (request?: StartChatRequest) => Promise<void>;
  sendUserMessage: (message: string) => Promise<void>;
}

export function useNovelChat(): UseNovelChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [genres, setGenres] = useState<GenreMap>({});
  const [phase, setPhase] = useState<ChatPhase>("genre_selection");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [novels, setNovels] = useState<NovelInfo[]>([]);

  const generateMessageId = () => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const initializeChat = useCallback(async (request?: StartChatRequest) => {
    setIsLoading(true);
    setError(null);
    setMessages([]);
    setNovels([]);

    try {
      const response = await startChat(request);
      setSessionId(response.session_id);
      setGenres(response.genres);
      setPhase(response.phase);

      // 即座に結果が返された場合は小説リストを設定
      if (response.novels) {
        setNovels(response.novels);
      }

      // AIのメッセージを追加
      setMessages([
        {
          id: generateMessageId(),
          role: "assistant",
          content: response.message,
          novels: response.novels ?? undefined,
        },
      ]);
    } catch (err) {
      setError("チャットの開始に失敗しました。再度お試しください。");
      console.error("Failed to start chat:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendUserMessage = useCallback(
    async (message: string) => {
      if (!sessionId || isLoading) return;

      setIsLoading(true);
      setError(null);

      // ユーザーメッセージを追加
      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: "user",
        content: message,
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await sendMessage({
          session_id: sessionId,
          message: message,
        });

        setPhase(response.phase);

        // 小説リストを更新
        if (response.novels) {
          setNovels(response.novels);
        }

        // AIのレスポンスを追加
        const assistantMessage: ChatMessage = {
          id: generateMessageId(),
          role: "assistant",
          content: response.message,
          novels: response.novels ?? undefined,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setError("メッセージの送信に失敗しました。再度お試しください。");
        console.error("Failed to send message:", err);
        // エラー時はユーザーメッセージを削除
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading]
  );

  return {
    messages,
    genres,
    phase,
    isLoading,
    error,
    sessionId,
    novels,
    initializeChat,
    sendUserMessage,
  };
}
