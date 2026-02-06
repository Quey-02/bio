"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import type { Game } from "../../types/games";
import gamesData from "../../data/games.json";

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const games = gamesData as Game[];

  const openModal = (game: Game) => {
    setSelectedGame(game);
  };

  const closeModal = () => {
    setSelectedGame(null);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, game: Game) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!game.comingSoon) {
        openModal(game);
      }
    }
  };

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedGame) {
        closeModal();
      }
    },
    [selectedGame]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  return (
    <div className={styles["main-container"]}>
      <h1 className={styles["page-title"]}>Games</h1>
      <p className={styles["page-description"]}>
        {/* 作成したゲームの一覧です。クリックで詳細情報をご覧いただけます。 */}
      </p>

      <div className={styles["games-grid"]}>
        {games.map((game) => (
          <div
            key={game.id}
            className={`${styles["game-card"]} ${
              game.comingSoon ? styles["coming-soon-card"] : ""
            } ${game.inDevelopment ? styles["in-development-card"] : ""}`}
            onClick={() => !game.comingSoon && openModal(game)}
            onKeyDown={(e) => handleCardKeyDown(e, game)}
            role="button"
            tabIndex={game.comingSoon ? -1 : 0}
            aria-disabled={game.comingSoon}
          >
            <div className={styles["game-thumbnail"]}>
              {game.inDevelopment && (
                <span className={styles["in-development-badge"]}>開発中</span>
              )}
              {game.comingSoon ? (
                <div className={styles["coming-soon-placeholder"]}></div>
              ) : game.thumbnail ? (
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  width={600}
                  height={200}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              ) : (
                <div className={styles["placeholder-image"]}></div>
              )}
            </div>
            <div className={styles["game-info"]}>
              <h3 className={styles["game-title"]}>{game.title}</h3>
              <p className={styles["game-description"]}>{game.description}</p>
              {game.tags.length > 0 && (
                <div className={styles["game-tags"]}>
                  {game.tags.map((tag, index) => (
                    <span key={index} className={styles["tag"]}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {game.techStack.length > 0 && (
                <div className={styles["game-tags"]}>
                  {game.techStack.map((tech, index) => (
                    <span key={index} className={styles["tag"]}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* モーダル */}
      {selectedGame && (
        <div className={styles["modal-overlay"]} onClick={closeModal}>
          <div
            className={styles["modal-content"]}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button className={styles["close-button"]} onClick={closeModal} aria-label="閉じる">
              ×
            </button>
            <h2 id="modal-title" className={styles["modal-title"]}>{selectedGame.title}</h2>
            <div className={styles["modal-body"]}>
              <div className={styles["modal-thumbnail"]}>
                {selectedGame.thumbnail ? (
                  <Image
                    src={selectedGame.thumbnail}
                    alt={selectedGame.title}
                    width={800}
                    height={300}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className={styles["placeholder-image"]}></div>
                )}
              </div>
              <div className={styles["modal-info"]}>
                <p className={styles["detailed-description"]}>
                  {selectedGame.detailedDescription}
                </p>
                {selectedGame.platform.length > 0 && (
                  <div className={styles["info-item"]}>
                    <strong>プラットフォーム:</strong>{" "}
                    {selectedGame.platform.join(", ")}
                  </div>
                )}
                {selectedGame.tags.length > 0 && (
                  <div className={styles["info-item"]}>
                    <strong>タグ:</strong> {selectedGame.tags.join(", ")}
                  </div>
                )}
                {selectedGame.techStack.length > 0 && (
                  <div className={styles["info-item"]}>
                    <strong>使用技術:</strong>{" "}
                    {selectedGame.techStack.join(", ")}
                  </div>
                )}
                {!selectedGame.comingSoon &&
                  (selectedGame.link ? (
                    <a
                      href={selectedGame.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles["game-link"]}
                    >
                      ゲームをプレイ
                    </a>
                  ) : (
                    <button
                      className={`${styles["game-link"]} ${styles["game-link-disabled"]}`}
                      disabled
                    >
                      ゲームをプレイ
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
