"use client";

import { useState } from "react";
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
            }`}
            onClick={() => !game.comingSoon && openModal(game)}
          >
            <div className={styles["game-thumbnail"]}>
              {game.comingSoon ? (
                <div className={styles["coming-soon-placeholder"]}></div>
              ) : game.thumbnail ? (
                <img src={game.thumbnail} alt={game.title} />
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
          >
            <button className={styles["close-button"]} onClick={closeModal}>
              ×
            </button>
            <h2 className={styles["modal-title"]}>{selectedGame.title}</h2>
            <div className={styles["modal-body"]}>
              <div className={styles["modal-thumbnail"]}>
                {selectedGame.thumbnail ? (
                  <img src={selectedGame.thumbnail} alt={selectedGame.title} />
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
