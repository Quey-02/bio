// TypeScript interfaces for the API response
export interface HeadlineSummarization {
  date_start: string;
  date_end: string;
  summarization: string;
}

interface NewsSummaryResponse {
  news_summary: HeadlineSummarization;
}

// Fetches the news summary from the Flask API using axios
import axios from "../axios";

export async function fetchNewsSummary(): Promise<HeadlineSummarization> {
  const response = await axios.get<NewsSummaryResponse>("/api/news-summary");
  return response.data.news_summary;
}
