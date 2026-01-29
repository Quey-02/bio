// チャットフェーズ
export type ChatPhase =
  | "genre_selection"
  | "questioning"
  | "recommending"
  | "completed";

// ジャンル情報
export interface GenreMap {
  [key: string]: string;
}

// 小説情報
export interface NovelInfo {
  title: string;
  ncode: string;
  writer: string;
  story: string;
  genre: string;
  keyword: string;
  url: string;
}

// チャット開始リクエスト（Selection First対応）
export interface StartChatRequest {
  genre?: string;
  keywords?: string[];
  free_text?: string;
}

// チャット開始レスポンス
export interface StartChatResponse {
  session_id: string;
  message: string;
  genres: GenreMap;
  phase: ChatPhase;
  novels?: NovelInfo[] | null;
}

// チャットメッセージリクエスト
export interface ChatMessageRequest {
  session_id: string;
  message: string;
}

// チャットメッセージレスポンス
export interface ChatMessageResponse {
  session_id: string;
  message: string;
  phase: ChatPhase;
  novels: NovelInfo[] | null;
}

// チャットメッセージ（UI用）
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  novels?: NovelInfo[];
}
