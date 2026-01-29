import axios from "@/utils/axios";
import type {
  StartChatRequest,
  StartChatResponse,
  ChatMessageRequest,
  ChatMessageResponse,
} from "@/types/novel_chat";

const API_BASE = "/novel/chat";

/**
 * チャットセッションを開始する
 * @param request 初期選択パラメータ（オプション）
 */
export async function startChat(
  request?: StartChatRequest
): Promise<StartChatResponse> {
  const response = await axios.post<StartChatResponse>(
    `${API_BASE}/start`,
    request ?? {}
  );
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
