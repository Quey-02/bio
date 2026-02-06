"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.scss";
import type { App } from "../../types/apps";
import appsData from "../../data/apps.json";

export default function AppsPage() {
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const apps = appsData as App[];
  const router = useRouter();

  const openModal = (app: App) => {
    setSelectedApp(app);
  };

  const closeModal = () => {
    setSelectedApp(null);
  };

  const handleAppClick = (app: App) => {
    if (app.comingSoon) return;

    if (app.link) {
      router.push(app.link);
    } else {
      openModal(app);
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, app: App) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAppClick(app);
    }
  };

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedApp) {
        closeModal();
      }
    },
    [selectedApp]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  return (
    <div className={styles["main-container"]}>
      <h1 className={styles["page-title"]}>Apps</h1>
      <p className={styles["page-description"]}>
        {/* 作成したアプリの一覧です。クリックで詳細情報をご覧いただけます。 */}
      </p>

      <div className={styles["apps-grid"]}>
        {apps.map((app) => (
          <div
            key={app.id}
            className={`${styles["app-card"]} ${app.comingSoon ? styles["coming-soon-card"] : ""}`}
            onClick={() => handleAppClick(app)}
            onKeyDown={(e) => handleCardKeyDown(e, app)}
            role="button"
            tabIndex={app.comingSoon ? -1 : 0}
            aria-disabled={app.comingSoon}
          >
            <div className={styles["app-thumbnail"]}>
              {app.comingSoon ? (
                <div className={styles["coming-soon-placeholder"]}></div>
              ) : app.thumbnail ? (
                <Image
                  src={app.thumbnail}
                  alt={app.title}
                  width={600}
                  height={200}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              ) : (
                <div className={styles["placeholder-image"]}></div>
              )}
            </div>
            <div className={styles["app-info"]}>
              <h3 className={styles["app-title"]}>{app.title}</h3>
              <p className={styles["app-description"]}>{app.description}</p>
              {app.tags.length > 0 && (
                <div className={styles["app-tags"]}>
                  {app.tags.map((tag, index) => (
                    <span key={index} className={styles["tag"]}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {app.techStack.length > 0 && (
                <div className={styles["app-tags"]}>
                  {app.techStack.map((tech, index) => (
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
      {selectedApp && (
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
            <h2 id="modal-title" className={styles["modal-title"]}>{selectedApp.title}</h2>
            <div className={styles["modal-body"]}>
              <div className={styles["modal-thumbnail"]}>
                {selectedApp.thumbnail ? (
                  <Image
                    src={selectedApp.thumbnail}
                    alt={selectedApp.title}
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
                  {selectedApp.detailedDescription}
                </p>
                {selectedApp.tags.length > 0 && (
                  <div className={styles["info-item"]}>
                    <strong>タグ:</strong>{" "}
                    {selectedApp.tags.join(", ")}
                  </div>
                )}
                {selectedApp.techStack.length > 0 && (
                  <div className={styles["info-item"]}>
                    <strong>使用技術:</strong>{" "}
                    {selectedApp.techStack.join(", ")}
                  </div>
                )}
                {!selectedApp.comingSoon && (
                  selectedApp.link ? (
                    <button
                      onClick={() => router.push(selectedApp.link!)}
                      className={styles["app-link"]}
                    >
                      アプリを開く
                    </button>
                  ) : (
                    <button
                      className={`${styles["app-link"]} ${styles["app-link-disabled"]}`}
                      disabled
                    >
                      アプリを開く
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
