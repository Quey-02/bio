"use client";

import styles from "./page.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  fetchNewsSummary,
  HeadlineSummarization,
} from "@/utils/news_summary/fetch";

export default function Page() {
  const [summary, setSummary] = useState<HeadlineSummarization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsSummary()
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch(() => {
        setError("ニュース要約の取得に失敗しました");
        setLoading(false);
      });
  }, []);

  return (
    <div className={clsx(styles["main-container"])}>
      <div className={clsx(styles[""])}>工事中</div>
      <h2> today&apos;s news </h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {summary && (
        <div>
          <div>
            期間: {summary.date_start} 〜 {summary.date_end}
          </div>
          <div>要約: {summary.summarization}</div>
        </div>
      )}
    </div>
  );
}
