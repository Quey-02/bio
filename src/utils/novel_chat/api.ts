import axios from "@/utils/axios";
import type {
  StartChatResponse,
  ChatMessageRequest,
  ChatMessageResponse,
} from "@/types/novel_chat";

const API_BASE = "/novel/chat";

/**
 * チャットセッションを開始する
 */
export async function startChat(): Promise<StartChatResponse> {
  const response = await axios.post<StartChatResponse>(`${API_BASE}/start`, {});
  return response.data;
}

/**
 * チャットメッセージを送信する
 */
export async function sendMessage(
  request: ChatMessageRequest
): Promise<ChatMessageResponse> {
  const response = await axios.post<ChatMessageResponse>(
    `${API_BASE}/message`,
    request
  );
  return response.data;
}
